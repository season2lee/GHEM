import React, { useState } from "react";
import { css } from "@emotion/react";
import CategorySelect from "@components/category/CategorySelect";
import ChoiceGameForRecommendPage from "./ChoiceGameForRecommendPage";

function CategoryPage() {
  const [isMove, setIsMove] = useState<boolean>(false);
  return (
    <div>
      {isMove ? (
        <ChoiceGameForRecommendPage />
      ) : (
        <div css={layout}>
          <div css={section}>
            <h1>어떤 게임 장르를 좋아하세요?</h1>
            <br />
            <h1>취향을 선택하고 나에게 맞는 게임을 추천 받아 보세요!</h1>
          </div>
          <div css={section}>
            <CategorySelect setIsMove={setIsMove} />
          </div>
        </div>
      )}
    </div>
  );
}

const layout = css`
  width: 100%;
  height: 100vh;
`;
const section = css`
  width: 100%;
  height: 50%;
  text-align: start;
`;
export default CategoryPage;
