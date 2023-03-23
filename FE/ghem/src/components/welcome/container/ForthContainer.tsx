import React, { Dispatch, SetStateAction } from 'react'
import { css } from '@emotion/react';
import { useNavigate } from 'react-router';

function ForthContainer() {
  const navigate = useNavigate()

  const CategoryHandler = () =>{
    navigate("/cateogory")
  }

  return (
    <div css={Layout} >
        <div >ForthContainer</div>
        <div>
          <button onClick={CategoryHandler}>추천받기</button>
        </div>
    </div>
    
  )
}

const Layout = css`
  /* scroll-snap-align: start; */
  width: 100%;
  height: 100vh;
  font-size: 1em;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export default ForthContainer