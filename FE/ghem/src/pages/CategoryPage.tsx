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
  height: 10%;
  text-align: start;
  margin-top: 5rem;
  margin-bottom: 2rem;
  margin-left: 5rem;
  margin-right: 5rem;
  h1{
    color: #ffffffef;
    text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
      0 0 7px #f6b4ffb9, 0 0 10px #f1c1ff53, 0 0 15px #ffd8f840,
      0 0 18px #eb68ffba, 0 0 23px #ffa9cb3a;
  }
`
const section = css`
  width: 100%;
  height: 70%;
  text-align: start;
  padding-bottom:5rem;
  padding-left: 5rem;
  padding-right: 5rem ;

`;
export default CategoryPage;
