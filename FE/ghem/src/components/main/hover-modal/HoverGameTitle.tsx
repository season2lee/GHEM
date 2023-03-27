import axios from "axios";
import React, { useEffect, useState } from "react";

type HoverGameTitleProps = {
  appid: number | null;
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
      console.log(response.data.data);
      if (response.data.data.Dib !== null) {
        setIsLike(true);
      }
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
      {isLike && <p>★</p>}
      {!isLike && <p>☆</p>}
      {props.gameRecommend?.total}
    </div>
  );
}

export default HoverGameTitle;
