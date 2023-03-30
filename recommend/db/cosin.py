import numpy as np
from surprise import Dataset, Reader
from scipy.spatial.distance import cosine
from concurrent.futures import ThreadPoolExecutor

def convert(data):
    if isinstance(data, (np.int64, np.int32)):
        return int(data)
    elif isinstance(data, (np.float64, np.float32)):
        return float(data)
    elif isinstance(data, list):
        return [convert(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert(value) for key, value in data.items()}
    else:
        return data

def update_svd_model(new_data, model):
    reader = Reader(rating_scale=(1, 5))
    new_data_surprise = Dataset.load_from_df(new_data, reader)
    new_trainset = new_data_surprise.build_full_trainset()
    model.fit(new_trainset)
    return model

#아이템과 비슷한 아이템 추천------------------------------------------------------------------------------------------------------------------------------------

def calculate_similarity_app(item_embedding, other_embedding):
    return 1 - cosine(item_embedding, other_embedding)

def get_similar_games(item_id, model, trainset, gameinfo, n_similar_items=10, n_workers=4):
    item_factors = model.qi
    item_inner_id = trainset.to_inner_iid(item_id)
    item_embedding = item_factors[item_inner_id]

    item_similarities = []

    with ThreadPoolExecutor(max_workers=n_workers) as executor:
        similarity_futures = []
        
        for inner_id, other_embedding in enumerate(item_factors):
            if inner_id == item_inner_id:
                continue
            future = executor.submit(calculate_similarity_app, item_embedding, other_embedding)
            similarity_futures.append((inner_id, future))
        
        for inner_id, future in similarity_futures:
            similarity = future.result()
            item_similarities.append((trainset.to_raw_iid(inner_id), similarity))

    item_similarities.sort(key=lambda x: x[1], reverse=True)

    item_similarities = item_similarities[:n_similar_items]

    recommendations = []
    for item, r in item_similarities:
        title = gameinfo.loc[gameinfo['app_id'] == item, 'title'].values[0]
        genre = gameinfo.loc[gameinfo['app_id'] == item, 'genre'].values[0]
        release_date = gameinfo.loc[gameinfo['app_id'] == item, 'release_date'].values[0]
        rating = gameinfo.loc[gameinfo['app_id'] == item, 'rating'].values[0]
        rating_desc = gameinfo.loc[gameinfo['app_id'] == item, 'rating_desc'].values[0]
        positive = gameinfo.loc[gameinfo['app_id'] == item, 'positive_reviews'].values[0]
        negative = gameinfo.loc[gameinfo['app_id'] == item, 'negative_reviews'].values[0]
        recommendations.append({
            'app_id': item,
            'title': title,
            'genre': genre,
            'release_date': release_date,
            'rating': rating,
            'rating_desc': rating_desc,
            'positive_reviews': positive,
            'negative_reviews': negative
        })


    return convert(recommendations)

#유저와 비슷한 유저 추천------------------------------------------------------------------------------------------------------------------------------------
def calculate_similarity_user(user_embedding, other_embedding):
    return 1 - cosine(user_embedding, other_embedding)

def get_similar_users(steam_id, model, trainset, userinfo, start = 0, end = 10, n_workers=4):
    user_factors = model.pu
    user_inner_id = trainset.to_inner_uid(steam_id)
    user_embedding = user_factors[user_inner_id]

    user_similarities = []

    with ThreadPoolExecutor(max_workers=n_workers) as executor:
        similarity_futures = []
        
        for inner_id, other_embedding in enumerate(user_factors):
            if inner_id == user_inner_id:
                continue
            future = executor.submit(calculate_similarity_user, user_embedding, other_embedding)
            similarity_futures.append((inner_id, future))
        
        for inner_id, future in similarity_futures:
            similarity = future.result()
            user_similarities.append((trainset.to_raw_uid(inner_id), similarity))

    user_similarities.sort(key=lambda x: x[1], reverse=True)
    user_similarities = user_similarities[start:end]
     # 유저 추가 정보
    top_similar_items_with_titles = []
    for item, similarity in user_similarities:
        nickname = userinfo.loc[userinfo['steam_id'] == item, 'nickname'].values[0]
        user_profile = userinfo.loc[userinfo['steam_id'] == item, 'user_profile'].values[0]
        top_similar_items_with_titles.append({
            'steam_id': item,
            'nickname': nickname,
            'user_profile': user_profile,
        })
        
    return convert(top_similar_items_with_titles)

#유저에게 아이템 추천 ------------------------------------------------------------------------------------------------------------------------------------

def recommend_games(steam_id, model, data, gameinfo, start = 0, end = 10):
    unique_items = data["app_id"].unique()
    user_item_ratings = [(steam_id, item, model.predict(steam_id, item).est) for item in unique_items]
    user_item_ratings.sort(key=lambda x: x[2], reverse=True)

    recomm = user_item_ratings[start:end]

    # 아이템 제목 추가
    recommendations = []
    for user, item, r in recomm:
        title = gameinfo.loc[gameinfo['app_id'] == item, 'title'].values[0]
        genre = gameinfo.loc[gameinfo['app_id'] == item, 'genre'].values[0]
        release_date = gameinfo.loc[gameinfo['app_id'] == item, 'release_date'].values[0]
        rating = gameinfo.loc[gameinfo['app_id'] == item, 'rating'].values[0]
        rating_desc = gameinfo.loc[gameinfo['app_id'] == item, 'rating_desc'].values[0]
        positive = gameinfo.loc[gameinfo['app_id'] == item, 'positive_reviews'].values[0]
        negative = gameinfo.loc[gameinfo['app_id'] == item, 'negative_reviews'].values[0]
        recommendations.append({
            'app_id': item,
            'title': title,
            'genre': genre,
            'release_date': release_date,
            'rating': rating,
            'rating_desc': rating_desc,
            'positive_reviews': positive,
            'negative_reviews': negative
        })
    
    return convert(recommendations)

#장르 추천 -------------------------------------------------------------------------------------------------------------
def contains_genre(value, input_genres):
    if not isinstance(input_genres, list):
        input_genres = [input_genres]
    for genre in input_genres:
        if genre.lower() in value.lower():
            return True
    return False



def sort_by_genre(gameinfo, genres, top):

    gameinfo['genre'] = gameinfo['genre'].str.replace(' ', '')
    filtered_game = gameinfo[gameinfo['genre'].apply(lambda x: contains_genre(x, genres))]
   
    # 평점 및 positive_review/negative_review 기준으로 정렬
    sorted_game = filtered_game.sort_values(by=['rating', 'positive_reviews','negative_reviews'], ascending=[False, False,True])

    # 상위 top_n개의 결과를 반환합니다.
    sorted_game = sorted_game.head(top)

    result_dict = sorted_game.to_dict(orient='records')
    
    return convert(result_dict)
