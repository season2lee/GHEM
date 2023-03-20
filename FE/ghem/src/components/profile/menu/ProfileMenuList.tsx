import { useState } from "react";
import { css } from "@emotion/react";
import ProfileMenu from "./ProfileMenu";

function ProfileMenus() {
  const [isOpenHiddenMenu, setIsOpenHiddenMenu] = useState<boolean>(false);

  const onClickOpenHiddenMenu = (): void => {
    setIsOpenHiddenMenu(!isOpenHiddenMenu);
  };

  return (
    <div css={profileMenuWrapper}>
      <ProfileMenu text="게임 목록" />
      <div>
        <ProfileMenu text="계정 정보" onClickOpenHiddenMenu={onClickOpenHiddenMenu} />
        {isOpenHiddenMenu && (
          <div css={hiddenMenuWrapper}>
            <ProfileMenu text="프로필 수정" />
            <ProfileMenu text="내 컴퓨터 사양" />
          </div>
        )}
      </div>
    </div>
  );
}

const profileMenuWrapper = css`
  width: 90%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    gap: 20px;

    > div {
      width: 50%;
      display: flex;
      flex-direction: column;
    }
  }
`;

const hiddenMenuWrapper = css`
  animation: fadein 1s;
  -moz-animation: fadein 1s; /* Firefox */
  -webkit-animation: fadein 1s; /* Safari and Chrome */
  -o-animation: fadein 1s; /* Opera */

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default ProfileMenus;
