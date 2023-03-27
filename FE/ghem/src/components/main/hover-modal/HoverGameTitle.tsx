import axios from "axios";
import React, { useEffect, useState } from "react";

type HoverGameTitleProps = {
  appid: number | null;
  haveData: "have" | "null" | "loading";
  gameTitle?: string;
  gameRecommend?: { total: number };
  gameType?: string;
};

function HoverGameTitle(props: HoverGameTitleProps) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLike, setIsLike] = useState<boolean>(false);

  const getIsLike = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32000/user/dibs/${props.appid}/${userId}`
      );
      if (response.data.data.Dib !== null) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const likeGame = async () => {
    const data = {
      appId: props.appid,
      userId: userId,
    };
    try {
      const response = await axios.post(
        `http://j8d107.p.ssafy.io:32000/user/dibs`,
        data
      );
      setIsLike(true);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const unLikeGame = async () => {
    try {
      const response = await axios.delete(
        `http://j8d107.p.ssafy.io:32000/user/dibs`
      );
      setIsLike(true);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  useEffect(() => {
    if (userId) {
      getIsLike();
    }
  }, [userId, props.appid]);

  return (
    <div>
      <p>{props.gameTitle}</p>
      {isLike && <p>★</p>}
      {!isLike && <p onClick={likeGame}>☆</p>}
      {props.gameRecommend?.total}
    </div>
  );
}

export default HoverGameTitle;
