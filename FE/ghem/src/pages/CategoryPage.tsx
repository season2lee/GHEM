import React, { useState } from "react";
import { css } from "@emotion/react";
import CategorySelect from "../components/recommend/category/CategorySelect"


function CategoryPage() {
  

  return (
    <div>
        <div css={layout}>
          <div css={categoryText}>
            <h1>어떤 게임 장르를 좋아하세요?</h1>
            <br />
            <h1>취향을 선택하고 나에게 맞는 게임을 추천 받아 보세요!</h1>
          </div>
          <div css={section}>
            <CategorySelect />
          </div>
        </div>
    </div>
  );
}

const layout = css`
  width: 100%;
  height: 100vh;
`;

const categoryText = css`
  width: 100%;
  height: 20%;
  text-align: start;
  margin: 5rem;
`
const section = css`
  width: 100%;
  height: 80%;
  text-align: start;
  padding:5rem;
`;
export default CategoryPage;
