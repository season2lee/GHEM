import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import axios from "axios";
import { mobile } from "@/util/Mixin";
import styled from "@emotion/styled";

type categoryListType = {
  genre_id: number;
  genre: string;
};

function CategorySelect() {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<categoryListType[]>([]);

  useEffect(() => {
    CategoryListApi();
    return () => {};
  }, []);

  const CategoryListApi = async () => {
    try {
      const response = await axios.get("http://j8d107.p.ssafy.io:32003/genres");
      setCategoryList(response.data);
    } catch (err) {
      console.log(err);
    }
  };


  const onSelectedItem = (checked: boolean, item: string) => {
    if (checked) {
      setSelectedList([...selectedList, item]);
    } else if (!checked) {
      setSelectedList(selectedList.filter((el) => el !== item));
    }
  };

  const onRemove = (item: string) => {
    setSelectedList(selectedList.filter((el) => el !== item));
  };

  const onMoveToChoice = () => {
    const genreList = selectedList.join("/");
    navigate("/choicegame", { state: genreList });
  };

  return (
    <div>
      <div>{selectedList.length}/3</div>
      <div css={section}>
        <div>
          {selectedList.length === 0 && <div>카테고리를 지정해 주세요</div>}
        </div>
        <div css={selectedCategory}>
          {selectedList.map((item) => {
            return (
              <div key={item}>
                <div>{item}</div>
                <div onClick={() => onRemove(item)}>X</div>
              </div>
            );
          })}
        </div>
        <div>
          {selectedList.length >= 3 ? (
            <button onClick={onMoveToChoice}>이동하기</button>
          ) : null}
        </div>
      </div>
      <Item checked={false}>
        {categoryList.map((item) => {
          return (
            <label key={item.genre_id}>
              <input
                type="checkbox"
                value={item.genre}
                onChange={(e) => {
                  onSelectedItem(e.target.checked, e.target.value);
                }}
                checked={selectedList.includes(item.genre) ? true : false}
              />
              <div>{item.genre}</div>
            </label>
          );
        })}
      </Item>
    </div>
  );
}

export default CategorySelect;

const section = css`
  display: inline-flex;
  justify-content: start;
  width: 100%;
  height: 50%;
`;

const selectedCategory = css`
  display: inline-flex;
  justify-content: start;
  div {
    display: inline-flex;
    margin-right: 1rem;
  }
`;

const Item = styled.div<{ checked: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: start;
  label {
    width: 30%;
    height: 30%;
    ${mobile} {
      width: 50%;
    }
  }
  input {
    display: none;
  }
`;
