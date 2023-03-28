import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

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
  const [numDib, setNumDib] = useState<number | null>(null);

  const getIsLike = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32000/user/dibs/${props.appid}/${userId}`
      );
      // console.log(response);
      if (response.data.data.Dib !== null) {
        setNumDib(response.data.data.Dib.dibs_id);
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
      console.log(response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const unLikeGame = async () => {
    try {
      const response = await axios.delete(
        `http://j8d107.p.ssafy.io:32000/user/dibs/delete/${numDib}`
      );
      setIsLike(false);
      console.log(response);
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
      {isLike && <FaHeart onClick={unLikeGame} size="25" color="red" />}
      {!isLike && <FaHeart onClick={likeGame} size="25" color="white" />}
      {props.gameRecommend?.total}
    </div>
  );
}

export default HoverGameTitle;
