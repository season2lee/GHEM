import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router";
import { CanBeFriendList } from "./FriendList";

type FriendListItemProps = {
  friend: CanBeFriendList;
  canClick: boolean;
};

function FriendListItem(props: FriendListItemProps) {
  const navigator = useNavigate();

  return (
    <div
      css={friedCard}
      onClick={() => {
        if (props.canClick) {
          if (props.friend.steam_id.toString().length !== 17) {
            navigator(`../profile/${props.friend.steam_id}/gamelist`);
          } else if (props.friend.steam_id.toString().length === 17) {
            const a = props.friend.steam_id;
            console.log(a);
            window.open(
              // `https://steamcommunity.com/profiles/${props.friend.steam_id}`
              `https://steamcommunity.com/search/users/#text=${props.friend.nickname}`
            );
          }
        }
      }}
    >
      <img
        css={imgSize}
        src={`${props.friend.user_profile}`}
        alt={`${props.friend.nickname}`}
        draggable="false"
      />
      <p>{props.friend.nickname}</p>
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
