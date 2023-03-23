import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router";

type FriendListItemProps = {
  id: string;
};

function FriendListItem(props: FriendListItemProps) {
  const navigator = useNavigate();

  return (
    <div
      css={friedCard}
      onClick={() => {
        navigator(`../profile/${props.id}/gamelist`);
      }}
    >
      <img
        css={imgSize}
        src="https://cdn.pixabay.com/photo/2017/07/31/23/50/people-2562102_960_720.jpg"
        alt=""
      />
      <p>{props.id}</p>
    </div>
  );
}

const friedCard = css`
  border: 0.5px solid #d5add3;
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: 0 0 0.1rem #fff, 0 0 1px #ffc4c4, 0 0 2px #faedff, 0 0 3px #f0cbff,
    0 0 2.5px #e7aaff, inset 0 0 2.8px #e9b2ff;
  margin: 3rem;
  padding: 3rem;
`;

const imgSize = css`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

export default FriendListItem;
