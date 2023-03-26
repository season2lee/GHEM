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