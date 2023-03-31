from pydantic import BaseModel

class UserRecommendation(BaseModel):
    steam_id: int
    nickname: str
    user_profile: str

class GameRecommendation(BaseModel):
    app_id: int
    title: str
    genre: str
    release_date: str
    rating: int
    rating_desc: str
    positive_reviews: int
    negative_reviews: int

class UserGameRating(BaseModel):
    steam_id : int
    app_id : int
    rating : int

class Genre(BaseModel):
    genre_id : int
    genre : str

class Game(BaseModel):
    app_id : int

class DisLikeGame(BaseModel):
    steam_id : int
    app_id : int


class GameRecomm(BaseModel):
    steam_id : int
    apps : str = ''

class GenreRecomm(BaseModel):
    steam_id : int
    genre : str = ''
    top : int = 10