import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import axios from "axios";
import { mobile } from "@/util/Mixin";
import styled from "@emotion/styled";
import GhemLogo from "@/assets/image/GhemLogo.png";


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
      <div css={categoryLength}>
      <div >{selectedList.length}/3</div>
      </div>

      <div css={section}>
        <div>
          {selectedList.length === 0 && (
            <div className="text">장르를 선택해 주세요</div>
          )}
        
        </div>
        <div css={selectedCategory}>
          {selectedList.map((item) => {
            return (
              <div key={item}>
                <div onClick={() => onRemove(item)} css={selectedItem}>
                  #{item}
                </div>
              </div>
            );
          })}
        </div>
        </div>
        <div css={btnContainer}>
        {selectedList.length >= 3 ? (
          <button css={moveBtn} onClick={onMoveToChoice}>이동하기</button>
        ) : null}
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
        <div className="logo"/>
      </Item>
    </div>
  );
}

export default CategorySelect;



const moveBtn = css`
  width: 10rem;
  height:2rem ;
  border-radius: 5px;
  padding: 7px 10px;
  border: none;
  color: white;
  background-color: rgb(88, 74, 110);
  cursor: pointer;
  &:hover {
    background-color: rgb(117, 98, 146);
  }
`

const btnContainer = css`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  ${mobile}{
    justify-content: center;

  }
`


const section = css`
  display: inline-flex;
  justify-content: flex-start;
  width: 100%;
  height: 20%;
  background-color: #0000002d;
  border-radius: 1rem;
  text-align: center;

  .text {
    padding: 1rem;
    width: 15rem;
  }
  ${mobile} {
    font-size: 0.68rem;
    .text{
      width: 10rem;
    }
  }
`;

const selectedCategory = css`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  div {
    width:15rem;    
    display: inline-flex;
    justify-content: center;
    margin-right: 1rem;
    align-items: center;
    text-align: center;
    margin: 1%;
    padding: 1rem;

    ${mobile} {
      display: flex;
      width: 100%;
    }
  }
`;

const selectedItem = css`
  height: 2rem;
  width: 10rem;
  /* margin: 1%; */
  /* padding: 0.5rem; */
  border: none;
  border-radius: 0.5rem;
  background-color: #292233;
  box-shadow: 0.2rem 0.2rem 0.5rem #15121b, -0.2rem -0.2rem 0.5rem transparent;
  ${mobile} {
    font-size: 0.68rem;
    height: 1rem;
     width: 2rem;
  }
`;

const categoryLength = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 2%;
  margin-bottom: 2%;

  ${mobile} {
    margin-bottom: 8%;
  }
`;

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
    color: transparent;
    height: 30%;
    width: 25%;
    margin: 1%;
    padding: 0.5%;;
    border-radius: 0.5rem;
    ${mobile} {
      font-size: 1rem;
      width: 100%;
      height: 100%;
      margin: 1%;
    }
  }

  label {
    height: 5rem;
    width: 25%;
    margin: 1%;
    padding: 0.5%;
    border: none;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    /* background-color:#beb3d238; */
    opacity: ${(props) => (props.checked ? 0.3 : 1)};
    border: 1px solid #beb3d2;
    font-size: 1.5rem;
    /* text-shadow: 1px 1px 2px pink; */
    color: #beb3d2;
    justify-content: center;
    /* box-shadow: 
    inset  .1rem .1rem .3rem #817795,
    .2rem .2rem .5rem #15121b,
  -.2rem -.2rem .5rem transparent; */

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
