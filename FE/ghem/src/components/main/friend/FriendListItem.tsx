import { css } from "@emotion/react";
import React from "react";

function FriendListItem() {
  return (
    <div css={friedCard}>
      <img
        css={imgSize}
        src="https://cdn.pixabay.com/photo/2017/07/31/23/50/people-2562102_960_720.jpg"
        alt=""
      />
      <p>id</p>
    </div>
  );
}

const friedCard = css`
  border: 1px solid #584a6e;
  margin: 3rem;
  padding: 3rem;
`;

const imgSize = css`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

export default FriendListItem;
