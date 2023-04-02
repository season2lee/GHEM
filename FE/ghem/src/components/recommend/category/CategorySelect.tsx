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
  const userId: number | null = Number(localStorage.getItem("id"));
  

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
    // 로그인 시 
    // 비로그인 시 
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
      <div css={categoryLength}>{selectedList.length}/3</div>
      <div css={section}>
        <div>
          {selectedList.length === 0 && <div className="text">장르를 선택해 주세요</div>}
        </div>
        <div css={selectedCategory}>
          {selectedList.map((item) => {
            return (
              <div key={item}>
                <div css={selectedItem}>{item}</div>
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
        <div className="logo">흠</div>
      </Item>
    </div>
  );
}

export default CategorySelect;

const section = css`
  display: inline-flex;
  justify-content: start;
  width: 100%;
  height: 5rem;
  background-color: #0000002d;
  border-radius: 1rem;
  text-align: center;
  .text { 
    padding:1rem
  }
  ${mobile} {
    font-size: 0.68rem;
  }
`;

const selectedCategory = css`
  display: inline-flex;
  justify-content: space-between;

 
  
  div {
    display: inline-flex;
    justify-content: center;
    margin-right: 1rem;
    align-items: center;
    text-align: center;
    margin: 1%;

     ${mobile} {
    display:flex;
  }
  }
`;

const selectedItem = css`
    height: 5rem;
    width: 10rem;
    margin: 1%;
    padding: 0.5rem;
    border: 1px solid white;
    border-radius: 0.5rem;
    ${mobile} {
      font-size: 1rem;
      width: 100%;
      height: 100%;
      margin: 1%;
    }
    
`

const categoryLength = css`
 display: flex;
 justify-content: flex-end;
 margin-top: 2%;
 margin-bottom: 2%;
`

const Item = styled.div<{ checked: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  
  /* div {
    height: 30%;
    width: 25%;
  } */
  .logo {
    height: 30%;
    width: 25%;
    margin: 1%;
    padding: 0.5%;
    border: 1px solid white;
    border-radius: 0.5rem;
    ${mobile} {
      font-size: 1rem;
      width: 100%;
      height: 100%;
      margin: 1%;
    }
  }

  label {
    height: 30%;
    width: 25%;
    margin: 1%;
    padding: 0.5%;
    border: 1px solid white;
    border-radius: 0.5rem;
   
    ${mobile} {
      font-size: 1rem;
      width: 100%;
      height: 100%;
      margin: 1%;
    }
  }
  input {
    display: none;
  }
`;
