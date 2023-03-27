from django.http import JsonResponse
import pandas as pd
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from fastapi import FastAPI
from typing import List
from contextlib import asynccontextmanager
from db.database import get_postgres_connection, get_mysql_connection
from db.cosin import update_svd_model, get_similar_games, get_similar_users, recommend_games, sort_by_genre
from db.model import GameRecommendation, Genre, UserRecommendation, UserGameRating

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

@app.get("/")
async def root():
    return {"message" : "Hello World"}


# POST 요청 처리 및 데이터 삽입
@app.post("/rating")
async def create_rating(userGameRating : UserGameRating):
    try:
        async with get_postgres_connection() as conn:
            result = await conn.fetch(
                "INSERT INTO ghem.rating (app_id, steam_id, rating) VALUES ($1, $2, $3);",
                userGameRating.app_id,
                userGameRating.steam_id,
                userGameRating.rating,
            )
        new_data = pd.DataFrame(
            [[userGameRating.steam_id, userGameRating.app_id, userGameRating.rating]],
            columns=["steam_id", "app_id", "rating"],
        )

        # SVD 모델 업데이트
        update_svd_model(new_data, svd)

        return JsonResponse(status_code=200, content={"message": "Rating created successfully"})

    except Exception as e:
        return JsonResponse(status_code=400, content={"message": str(e)})


# 유저와 비슷한 유저 추천
@app.get("/user", response_model=List[UserRecommendation])
def recommuser(steam_id : int = 0):
    if steam_id == 0:
        return '', 200

    similar_users = get_similar_users(steam_id, svd, trainset, userinfo)
    return similar_users


# 유저에게 게임 추천 
@app.get("/user/games", response_model=List[GameRecommendation])
def recommusergames(steam_id : int = 0, start : int = 0, end : int = 10):
    if steam_id == 0:
        return [], 200

    games = recommend_games(steam_id, svd, ratings, gameinfo)
    return games


# 게임과 비슷한 게임 추천
@app.get("/games", response_model=List[GameRecommendation])
def recommgames(app_id : int = 0, start : int = 0, end : int = 10):
    if app_id == 0:
        return '', 200
    
    recommend_games = get_similar_games(app_id, svd, trainset, gameinfo)
    return recommend_games

# 게임 장르별 추천 추천
@app.get("/games/genre", response_model=List[GameRecommendation])
def recommgames(genre : str = '', top : int = 10):
    if str == '':
        return '', 200
    
    recommend_games = sort_by_genre(gameinfo, genre, top)
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
        return JsonResponse(status_code=400, content={"message": str(e)})