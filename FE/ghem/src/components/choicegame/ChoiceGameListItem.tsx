import React, { useState, SetStateAction } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

type ChoiceGameListItemProps = {
  appid: number;
  setGood: React.Dispatch<SetStateAction<number[]>>;
  setSoso: React.Dispatch<SetStateAction<number[]>>;
  setBad: React.Dispatch<SetStateAction<number[]>>;
  good: number[];
  soso: number[];
  bad: number[];
};

function ChoiceGameListItem({
  appid,
  setGood,
  setSoso,
  setBad,
  good,
  soso,
  bad,
}: ChoiceGameListItemProps) {
  const [checked, setChecked] = useState<boolean>(false);

  const ClickGoodhandler = () => {
    if (soso.includes(appid)) {
      setSoso(soso.filter((el) => el !== appid));
      setGood([...good, appid]);
    } else if (bad.includes(appid)) {
      setBad(soso.filter((el) => el !== appid));
      setGood([...good, appid]);
    } else {
      setGood([...good, appid]);
      setChecked(true);
    }
  };

  const ClickSosohandler = () => {
    if (good.includes(appid)) {
      setGood(good.filter((el) => el !== appid));
      setSoso([...soso, appid]);
    } else if (bad.includes(appid)) {
      setBad(bad.filter((el) => el !== appid));
      setSoso([...soso, appid]);
    } else {
      setChecked(true);
      setSoso([...soso, appid]);
    }
  };

  const ClickBadhandler = () => {
    if (good.includes(appid)) {
      setGood(good.filter((el) => el !== appid));
      setBad([...soso, appid]);
    } else if (soso.includes(appid)) {
      setSoso(soso.filter((el) => el !== appid));
      setBad([...soso, appid]);
    } else {
      setChecked(true);
      setBad([...soso, appid]);
    }
  };

  const RemoveHandler = () => {
    if (good.includes(appid)) {
      setGood(good.filter((el) => el !== appid));
    } else if (soso.includes(appid)) {
      setSoso(soso.filter((el) => el !== appid));
    } else if (bad.includes(appid)) {
      setBad(bad.filter((el) => el !== appid));
    }
    setChecked(false);
  };

  return (
    <div>
      <Card checked={checked}>
        <img
          css={selectTmg}
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/hero_capsule.jpg`}
          alt={`${appid}`}
        />
        {checked ? (
          <ButtonList>
            {good.includes(appid) === true ? (
              <>
                <button onClick={RemoveHandler}>평가 취소하기</button>
                <button onClick={ClickSosohandler}>😐</button>
                <button onClick={ClickBadhandler}>😥</button>
              </>
            ) : soso.includes(appid) === true ? (
              <>
                <button onClick={RemoveHandler}>평가 취소하기</button>
                <button onClick={ClickGoodhandler}>😄</button>
                <button onClick={ClickBadhandler}>😥</button>
              </>
            ) : bad.includes(appid) === true ? (
              <>
                <button onClick={RemoveHandler}>평가 취소하기</button>
                <button onClick={ClickGoodhandler}>😄</button>
                <button onClick={ClickSosohandler}>😐</button>
              </>
            ) : (
              ""
            )}
          </ButtonList>
        ) : (
          <ButtonList>
            <button onClick={ClickGoodhandler}>😄</button>
            <button onClick={ClickSosohandler}>😐</button>
            <button onClick={ClickBadhandler}>😥</button>
          </ButtonList>
        )}
      </Card>
    </div>
  );
}
const Card = styled.div<{ checked: boolean }>`
  opacity: ${(props) => (props.checked ? 0.3 : 1)};
`;
const ButtonList = styled.div``;

const selectTmg = css`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export default ChoiceGameListItem;
