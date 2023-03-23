import numpy as np
import pandas as pd
from sklearn.decomposition import TruncatedSVD
from fastapi import FastAPI
from contextlib import asynccontextmanager
from db.postgresql import postgre_cur
from db.mysql import mysql_cur
from db.cosin import recommend_item, similar_game_recomm, similar_steamids


gameinfo = pd.DataFrame()
steamid_appid_rating = pd.DataFrame()
corr = np

@asynccontextmanager
async def lifespan(app: FastAPI):
    global gameinfo
    global steamid_appid_rating
    global corr

    print("시작")
    # 데이터베이스에서 값 가져오기
    postgre_cur.execute("select * from ghem.rating;")
    rows = postgre_cur.fetchall()
    
    col_name = ['app_id', 'steam_id', 'rating']
    
    ratings_postgre = pd.DataFrame(rows, columns=col_name)


    mysql_cur.execute("select * from game;")
    rows = mysql_cur.fetchall()
    
    col_name = ['app_id', 'genre', 'negative_reviews', 'positive_reviews', 'rating', 'rating_desc', 'release_date', 'title']

    gameinfo = pd.DataFrame(rows, columns=col_name)

    # 머신러닝 
    ratings = ratings_postgre[['steam_id', 'app_id', 'rating']]
    data = ratings.sort_values(['steam_id', 'app_id'])

    steamid_appid_rating = data.pivot_table('rating', index ='steam_id', columns='app_id').fillna(0)

    appid_steamid_rating = steamid_appid_rating.values.T 
    SVD = TruncatedSVD(n_components=12)
    matrix = SVD.fit_transform(appid_steamid_rating)
    corr = np.corrcoef(matrix)
    yield
    # 애플리케이션이 끝나기 전에 실행
    print("끝")
    # Clean up the ML models and release the resources


app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    return {"message" : "Hello World"}


@app.get("/user")
def recommuser(steam_id : int = 0):
    if steam_id == 0:
        return '', 200

    similars = similar_steamids(steam_id, steamid_appid_rating)
    return similars

@app.get("/user/games")
def recommusergames(steam_id : int = 0):
    if steam_id == 0:
        return '', 200

    similars = similar_steamids(steam_id, steamid_appid_rating)
    recommend_games = recommend_item(steam_id, similars, steamid_appid_rating, gameinfo)
    recommend_games = recommend_games.values.tolist()
    return recommend_games

@app.get("/games")
def recommgames(app_id : int = 0):
    if app_id == 0:
        return '', 200
    
    appids = steamid_appid_rating.columns
    recommend_games = similar_game_recomm(appids, app_id, corr)
    return recommend_games