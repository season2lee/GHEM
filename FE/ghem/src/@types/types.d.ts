declare module "gameList" {
  export type userType = {
    user_id: number;
    id: string;
    nickname: string;
    userProfile: string;
    gender: number;
    birth: string;
    steamId: string | null;
    introduce: string;
  };

  export type gameType = {
    appId: number;
    title: string;
    genre: string;
    release_date: string;
    rating: number;
    rating_desc: string;
    positive_reviews: number;
    negative_reviews: number;
  };

  export type ratingGameListType = {
    userGameId: number;
    rating: number;
    user: userType;
    game: gameType;
    content: string | null;
    updateDate: string | null;
  };

  export type interestedGameListType = {
    dibsId: number;
    appId: number;
    userId: number;
    game: gameType;
  };
}
