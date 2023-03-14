import { useState } from "react";
import { css } from "@emotion/react";
import ProfileMenu from "./ProfileMenu";

function ProfileMenus() {
  const [isOpenHiddenMenu, setIsOpenHiddenMenu] = useState<boolean>(false);

  const onClickOpenHiddenMenu = (): void => {
    setIsOpenHiddenMenu(!isOpenHiddenMenu);
  };

  return (
    <div>
      <ProfileMenu text="게임 목록" />
      <ProfileMenu text="계정 정보" onClickOpenHiddenMenu={onClickOpenHiddenMenu} />
      {isOpenHiddenMenu && (
        <>
          <ProfileMenu text="프로필 수정" />
          <ProfileMenu text="내 컴퓨터 사양" />
        </>
      )}
    </div>
  );
}

export default ProfileMenus;
