import pandas as pd
import requests
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from contextlib import asynccontextmanager
from db.database import get_postgres_connection, get_mysql_connection
from db.cosin import update_svd_model, get_similar_games, get_similar_users, recommend_games, sort_by_genre
from db.model import Game, GameRecommendation, Genre, UserRecommendation, UserGameRating, DisLikeGame, GameRecomm, GenreRecomm

# CORS 미들웨어 설정
origins = [
    "http://localhost:5173",
    "http://j8d107.p.ssafy.io",
    "http://j8d107.p.ssafy.io:8081"
]


# svd, ratings, gameinfo, trainset
userinfo = pd.DataFrame()
ratings = pd.DataFrame()
gameinfo = pd.DataFrame()
svd = SVD()
trainset = ()


async def get_data_from_databases():
    global ratings
    global userinfo
    global gameinfo

    # Get data from PostgreSQL database
    async with get_postgres_connection() as postgre_conn:
        rows = await postgre_conn.fetch("SELECT * FROM ghem.rating;")
        col_name = ['app_id', 'steam_id', 'rating']
        ratings = pd.DataFrame(rows, columns=col_name)

        rows = await postgre_conn.fetch("SELECT * FROM ghem.users;")
        col_name = ['steam_id', 'nickname', 'user_profile']
        userinfo = pd.DataFrame(rows, columns=col_name)

    # Get data from MySQL database
    async with get_mysql_connection() as mysql_conn:
        mysql_cur = await mysql_conn.cursor()

        # rating in mysql
        await mysql_cur.execute("SELECT * FROM usergame;")
        rows = await mysql_cur.fetchall()
        col_name = ['user_game_id', 'rating', 'app_id', 'steam_id', 'content', 'update_date', 'helpful']
        ratings_mysql = pd.DataFrame(rows, columns=col_name)
        ratings_mysql = ratings_mysql[['app_id','steam_id', 'rating']]

        ratings = pd.concat([ratings, ratings_mysql], axis=0)


        # user in mysql
        await mysql_cur.execute("SELECT * FROM users;")
        rows = await mysql_cur.fetchall()
        col_name = ['steam_id', 'birth', 'gender', 'id', 'introduce', 'nickname', 'real_steam_id', 'user_profile']
        userinfo_mysql = pd.DataFrame(rows, columns=col_name)
        userinfo_mysql = userinfo_mysql[['steam_id','nickname', 'user_profile']]

        userinfo = pd.concat([userinfo, userinfo_mysql], axis=0)

        await mysql_cur.execute("SELECT * FROM game;")
        rows = await mysql_cur.fetchall()
        col_name = ['app_id', 'genre', 'negative_reviews', 'positive_reviews', 'rating', 'rating_desc', 'title', 'release_date']
        gameinfo = pd.DataFrame(rows, columns=col_name)


@asynccontextmanager
async def lifespan(app: FastAPI):
    global svd
    global trainset

    print("시작")
 
    await get_data_from_databases()

    # 머신러닝
    reader = Reader(rating_scale=(1, 5))  # 평점 범위를 지정, 예: 1에서 5
    surprise_data = Dataset.load_from_df(ratings[['steam_id', 'app_id', 'rating']], reader)

    # 데이터를 학습용과 테스트용으로 분리
    trainset, testset = train_test_split(surprise_data, test_size=0.2)

    # SVD 알고리즘 객체 생성 및 학습
    svd = SVD()
    svd.fit(trainset)
    yield
    # 애플리케이션이 끝나기 전에 실행
    print("끝")



app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message" : "Hello World"}

# DELETE 요청 처리 및 데이터 삽입
@app.delete("/rating")
async def create_rating(userGameRating : UserGameRating):
    try:
        ratings = ratings[~((ratings['steam_id'] == userGameRating.steam_id) & (ratings['app_id'] == userGameRating.app_id))]
        
        # SVD 모델 업데이트
        svd = update_svd_model(ratings, svd)

        return "Rating delete successfully", 200
    except Exception as e:
        return  str(e), 500

# PUT 요청 처리 및 데이터 삽입
@app.put("/rating")
async def create_rating(userGameRating : UserGameRating):
    if ((ratings['steam_id'] == userGameRating.steam_id) & (ratings['app_id'] == userGameRating.app_id)).any():
        return "No data found", 200

    try:
        ratings.loc[((ratings['steam_id'] == userGameRating.steam_id) & (ratings['app_id'] == userGameRating.app_id)), 'rating'] = userGameRating.rating
        
        # SVD 모델 업데이트
        svd = update_svd_model(ratings, svd)

        return "Rating created successfully", 200
    except Exception as e:
        return  str(e), 500


# POST 요청 처리 및 데이터 삽입
@app.post("/rating")
async def create_rating(userGameRating : UserGameRating):
    # 새로운 데이터를 추가하기 전에, 이미 존재하는 데이터인지 확인합니다.
    if ((ratings['steam_id'] == userGameRating.steam_id) & (ratings['app_id'] == userGameRating.app_id)).any():
    # 이미 존재하는 데이터인 경우, 새로운 데이터를 추가하지 않습니다.
        return "Rating already exists", 200

    try:
        new_data = pd.DataFrame(
            [[userGameRating.steam_id, userGameRating.app_id, userGameRating.rating]],
            columns=["steam_id", "app_id", "rating"],
        )

        new_data = pd.concat([ratings, new_data], ignore_index=True)
        # SVD 모델 업데이트
        svd = update_svd_model(new_data, svd)

        return "Rating created successfully", 200
    except Exception as e:
        return  str(e), 500

# POST 요청 처리 및 데이터 삽입
@app.post("/game")
async def create_game(game : Game):
    if game.app_id == 0:
        return 'app_id is null', 200
    try:
        async with get_mysql_connection() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("SELECT * FROM game WHERE app_id = %s;", (game.app_id,))
                row = await cursor.fetchone()
                
                print(row)

                if(row == None):
                    res = requests.get(f'https://store.steampowered.com/api/appdetails?appids={game.app_id}')

                    game_data = res.json()
                    
                    try:
                        game_data = game_data[f'{game.app_id}']
                    except Exception as e:
                        return str(e), 500

                    try:
                        game_data = game_data['data']
                    except Exception as e:
                        return str(e), 500

                    try:
                        game_title = game_data['name']
                        
                        game_genres = game_data['genres']
                        game_genre = str()

                        for i in range(len(game_genres)):
                            if i == 0:
                                game_genre += game_genres[i]['description']
                            else:
                                game_genre += "/" + game_genres[i]['description']
                    except Exception as e:
                        return  str(e), 500
                    
                    game_release = game_data['release_date']
                    game_release = game_release['date']
                    

                    try:
                        res = requests.get(f'https://store.steampowered.com/appreviews/{game.app_id}?json=1')

                        review_data = res.json()

                        review_data = review_data['query_summary']
                        
                        review_score = review_data['review_score']
                        review_score_desc = review_data['review_score_desc']
                        positive_reviews = review_data['total_positive']
                        negative_reviews = review_data['total_negative']

                        
                        await cursor.execute("""
                            INSERT INTO game (app_id, genre, negative_reviews, positive_reviews, rating, rating_desc, title, release_date)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                            """, (game.app_id, game_genre, negative_reviews, positive_reviews, review_score, review_score_desc, game_title, game_release))
                        await conn.commit()
                    except Exception as e:
                        return str(e), 500
        return '', 200       
    except Exception as e:
        return  str(e), 500


# 유저와 비슷한 유저 추천
@app.get("/user", response_model=List[UserRecommendation])
def recommuser(steam_id : int = 0):
    if steam_id not in userinfo['steam_id'].values:
        # 이미 존재하는 경우, 빈 배열 반환
        return []

    similar_users = get_similar_users(steam_id, svd, trainset, userinfo)
    return similar_users


# 유저에게 게임 추천 
@app.get("/user/games", response_model=List[GameRecommendation])
def recommusergames(steam_id : int = 0, start : int = 0, end : int = 10):
    if steam_id not in userinfo['steam_id'].values:
        # 이미 존재하는 경우, 빈 배열 반환
        return []

    games = recommend_games(steam_id, svd, ratings, gameinfo, start, end)
    # model.steam_id에 해당하는 사용자가 이미 평가한 app_id를 찾습니다.
    rated_app_ids = set(ratings[ratings['steam_id'] == steam_id]['app_id'])

    # 이미 평가한 app_id를 제외하고 recommend_games를 필터링합니다.
    games = [game for game in games if game['app_id'] not in rated_app_ids]

    games = list({game['app_id']: game for game in games}.values())
    return games

# 게임과 비슷한 게임 추천
@app.get("/games/v1", response_model=List[GameRecommendation])
def recommgames(apps : str = ''):
    if apps == '':
        return '', 200
    
    app_list = apps.split('/')
    recommend_games = []
    for app_id in app_list:
        app_id = int(app_id)
        game_list = get_similar_games(app_id, svd, trainset, gameinfo)
        recommend_games.extend(game_list)

    # 중복 제거
    recommend_games = list({game['app_id']: game for game in recommend_games}.values())
    return recommend_games

# 게임과 비슷한 게임 추천
@app.get("/games/v2", response_model=List[GameRecommendation])
def recommgames(model : GameRecomm = Depends(GameRecomm)):
    if model.apps == '':
        return '', 200
    
    app_list = model.apps.split('/')
    recommend_games = []
    for app_id in app_list:
        app_id = int(app_id)
        try:
            game_list = get_similar_games(app_id, svd, trainset, gameinfo)
            recommend_games.extend(game_list)
        except:
            continue
        

    # model.steam_id에 해당하는 사용자가 이미 평가한 app_id를 찾습니다.
    rated_app_ids = set(ratings[ratings['steam_id'] == model.steam_id]['app_id'])

    # 이미 평가한 app_id를 제외하고 recommend_games를 필터링합니다.
    recommend_games = [game for game in recommend_games if game['app_id'] not in rated_app_ids]

    # 중복 제거
    recommend_games = list({game['app_id']: game for game in recommend_games}.values())

    recommend_games.sort(key=lambda x: (x['positive_reviews'], x['rating']), reverse=True)
    return recommend_games

# 게임 장르별 추천
@app.get("/games/genre/v1", response_model=List[GameRecommendation])
def recommgames(genre : str = '', top : int = 10):
    if genre == '':
        return '', 200
    
    genre_list = genre.split('/')
    recommend_games = []
    for g in genre_list:
        try:
            game_list = sort_by_genre(gameinfo, g, top)
            recommend_games.extend(game_list)
        except:
            continue
        
    
    # 중복 제거
    recommend_games = list({game['app_id']: game for game in recommend_games}.values())  
    return recommend_games

# 게임 장르별 추천
@app.get("/games/genre/v2", response_model=List[GameRecommendation])
def recommgames(model : GenreRecomm = Depends(GenreRecomm)):
    if model.genre == '':
        return '', 200
    
    genre_list = model.genre.split('/')
    recommend_games = []
    for g in genre_list:
        try:
            game_list = sort_by_genre(gameinfo, g, model.top)
            recommend_games.extend(game_list)
        except:
            continue
        

    # model.steam_id에 해당하는 사용자가 이미 평가한 app_id를 찾습니다.
    rated_app_ids = set(ratings[ratings['steam_id'] == model.steam_id]['app_id'])

    # 이미 평가한 app_id를 제외하고 recommend_games를 필터링합니다.
    recommend_games = [game for game in recommend_games if game['app_id'] not in rated_app_ids]

    recommend_games = list({game['app_id']: game for game in recommend_games}.values())  # 중복 제거
    return recommend_games

# 게임 장르 리스트
@app.get("/genres", response_model=List[Genre])
async def genres():
    try:
        async with get_mysql_connection() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("SELECT * FROM genres;")
                rows = await cursor.fetchall()
                genres = [Genre(genre_id=row[0], genre=row[1]) for row in rows]
                return genres
    except Exception as e:
        return str(e), 500
    
# Delete dislike
@app.delete("/dislike")
async def delete_dislike(disLikeGame : DisLikeGame = Depends(DisLikeGame)):
    try:
        async with get_postgres_connection() as conn:
            await conn.fetch(
                "DELETE FROM ghem.dislike WHERE steam_id = $1 AND app_id = $2;",
                disLikeGame.steam_id,
                disLikeGame.app_id
            )
        return "Dislike deleted successfully", 200
    except Exception as e:
        return  str(e), 500


# POST dislike
@app.post("/dislike")
async def create_dislike(disLikeGame : DisLikeGame):
    try:
        async with get_postgres_connection() as conn:
            row = await conn.fetchrow("SELECT * FROM ghem.dislike WHERE steam_id = $1 AND app_id = $2;", disLikeGame.steam_id, disLikeGame.app_id)
            
            res = str()

            if row is None:
                await conn.fetch(
                    "INSERT INTO ghem.dislike (steam_id, app_id) VALUES ($1, $2);",
                    disLikeGame.steam_id,
                    disLikeGame.app_id
                )
                res = "Dislike created successfully"
            else:
                res = "Value already exists"

        return res, 200
    except Exception as e:
        return  str(e), 500
    
# GET dislike
@app.get("/dislike", response_model=List[DisLikeGame], status_code=200)
async def get_dislike(steam_id: int = 0):
    if steam_id == 0:
        return []

    try:
        async with get_postgres_connection() as conn:
            rows = await conn.fetch("SELECT * FROM ghem.dislike WHERE steam_id=$1;", steam_id)
            games = [DisLikeGame(**row) for row in rows]
            return games
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Delete Disapproving 부적절한 컨텐츠
@app.delete("/disapproving")
async def delete_disapproving(game : Game = Depends(Game)):
    try:
        async with get_postgres_connection() as conn:
            await conn.fetch(
                "DELETE FROM ghem.disapproving WHERE app_id = $1;",
                game.app_id
            )
        return "disapproving deleted successfully", 200
    except Exception as e:
        return  str(e), 500

# Post Disapproving 부적절한 컨텐츠
@app.post("/disapproving")
async def create_disapproving(game : Game):
    try:
        async with get_postgres_connection() as conn:
            await conn.fetch(
                "INSERT INTO ghem.disapproving (app_id) VALUES ($1);",
                game.app_id
            )
        return "disapproving created successfully", 200
    except Exception as e:
        return  str(e), 500
    
# GET Disapproving 부적절한 컨텐츠
@app.get("/disapproving", response_model=List[Game], status_code=200)
async def get_disapproving():
    try:
        async with get_postgres_connection() as conn:
            rows = await conn.fetch("SELECT * FROM ghem.disapproving;")
            games = [Game(**row) for row in rows]
            return games
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))