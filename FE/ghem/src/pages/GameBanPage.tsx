import GameCanvas from "@components/common/GameCanvas";
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";

function GameBanPage() {
  const [thisText, setThisText] = useState<string>("");

  const onHandleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThisText(e.target.value);
  };

  const makeBanGame = async () => {
    try {
      const response = await axios.post(
        `http://j8d107.p.ssafy.io:32003/disapproving`,
        { app_id: Number(thisText) }
      );
      console.log(response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const getBanGame = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32003/disapproving`
      );
      console.log(response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div css={centerDiv}>
      <div>
        <input type="text" onChange={onHandleChage} value={thisText} />
        <p>{thisText}</p>
        <button onClick={makeBanGame}>밴하자</button>
        <button onClick={getBanGame}>밴목록 보기</button>
      </div>
      <GameCanvas />
    </div>
  );
}

const centerDiv = css`
  text-align: center;
`;

export default GameBanPage;
