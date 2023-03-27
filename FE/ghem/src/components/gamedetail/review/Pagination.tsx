import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'

const MAX_PAGE_COUNT = 5;  // 최대로 보여질 페이지의 갯수

type PaginationProps = {
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
}

function Pagination({currentPage, setCurrentPage}: PaginationProps) {
  const [pageNums, setPageNums] = useState<number[]>([]);  // 페이지 번호 목록
  const [isDisableMoveToPrev, setIsDisableMoveToPrev] = useState(true);
  const [isDisableMoveToNext, setIsDisableMoveToNext] = useState(false);
  const [lastPageNum, setLastPageNum] = useState(13);  // 마지막 페이지 번호
  const [test, setTest] = useState("");

  // 페이지 번호 목록 정하는 함수
  // 단순히 시작하는 페이지, 끝나는 페이지만을 받아서 페이지 번호 목록 배열을 리턴할 뿐이다(선언적으로 사고함)
  const setPagesNumber = (startNum: number, endNum: number) => {
    setPageNums((oldState) => {
      if (oldState[0] === startNum && oldState[oldState.length-1] === endNum) {
        return oldState;
      } else {
        const newPageNums: number[] = [];
        for (let num = startNum; num <= endNum; num++) {
          newPageNums.push(num);
        }
        return newPageNums;
      }
    })
  }

  // 최초 렌더링 시에 페이지 번호 결정하여 렌더링에 반영
  useEffect(() => {
    if (1 <= lastPageNum && lastPageNum <= MAX_PAGE_COUNT) {  // 마지막 페이지 번호 이하인 경우
      setPagesNumber(1, lastPageNum);
    } else if(lastPageNum > MAX_PAGE_COUNT) {  // 마지막 페이지 번호 초과인 경우
      setPagesNumber(1, MAX_PAGE_COUNT);
    }
  }, [])

  // 현재 페이지 번호가 처음 or 마지막인지에 따라 이전, 다음 버튼 활성화 여부 결정
  useEffect(() => {
    setIsDisableMoveToPrev(() => {
      if (currentPage === 1) {
        return true;
      } else {
        return false;
      }
    });
    setIsDisableMoveToNext(() => {
      if (currentPage === lastPageNum) {
        return true;
      } else {
        return false;
      }
    })
  }, [currentPage])

  // 처음 페이지로 이동하는 함수
  const moveFirstPage = () => {
    setCurrentPage((oldState) => {
      if (oldState === 1) {
        console.log("이미 첫 페이지임");
        return oldState;
      } else {
        if (lastPageNum < MAX_PAGE_COUNT) {  // 마지막 페이지 번호가 최대로 보여질 페이지의 갯수보다 작은 경우
          setPagesNumber(1, lastPageNum);  // 1 ~ 마지막 페이지로 렌더링 한다
        } else {
          setPagesNumber(1, MAX_PAGE_COUNT);
        }
        return 1;
      }
    })
  }

  // 이전 페이지로 이동하는 함수
  const movePrevPage = () => {
    setCurrentPage((oldState) => {
      if (oldState <= 1) {
        console.log("이미 첫 페이지임");
        return 1;
      } else {
        const newState = oldState - 1;
        if ((oldState - 1) % MAX_PAGE_COUNT === 0) {  // 현재 페이지가 가장 왼쪽 페이지라면
          setPagesNumber(newState - MAX_PAGE_COUNT + 1, newState);  // 페이지 번호 목록을 업데이트 한다
        }
        return newState;
      }
    })
  }

  // 다음 페이지로 이동하는 함수
  const moveNextPage = () => {
    // setCurrentPage((oldState) => {
    //   if (oldState === 5) {
    //     setTest("q");
    //   }
    //   return oldState + 1;
    // })
    setCurrentPage((oldState) => {
      if (oldState >= lastPageNum) {
        console.log("이미 마지막 페이지임");
        return oldState;
      } else {
        const newState = oldState + 1;
        if ((oldState - 1) % MAX_PAGE_COUNT === MAX_PAGE_COUNT-1) {  // 현재 페이지가 가장 오른쪽 페이지라면
          if (newState + MAX_PAGE_COUNT - 1 >= lastPageNum) {  // 새로 이동할 페이지의 가장 오른쪽 페이지가 마지막 페이지라면
            setPagesNumber(newState, lastPageNum);  // 마지막 페이지로 페이지 번호 목록을 업데이트 한다
          } else {
            setPagesNumber(newState, newState + MAX_PAGE_COUNT - 1);
          }
        }
        return newState;
      }
    })
  }

  // 마지막 페이지로 이동하는 함수
  const moveLastPage = () => {
    setCurrentPage((oldState) => {
      if (oldState === lastPageNum) {
        console.log("이미 마지막 페이지임");
        return oldState;
      } else {
        setPagesNumber(lastPageNum - (lastPageNum - 1) % MAX_PAGE_COUNT, lastPageNum);
        return lastPageNum;
      }
    })
  }

  // 페이지 버튼 눌렀을 때 해당 버튼의 번호로 이동하는 함수
  const moveSpecificPage = (pageNum: number) => {
    setCurrentPage((oldState) => {
      if (oldState === pageNum) {
        console.log("이미 현재 페이지");
        return oldState;
      } else {
        return pageNum;
      }
    })
  }

  return (
    <div css={container}>
      <button onClick={moveFirstPage} css={pageButtonStyle} disabled={isDisableMoveToPrev}>처음</button>
      <button onClick={movePrevPage} css={pageButtonStyle} disabled={isDisableMoveToPrev}>이전</button>
      {pageNums.map(pageNum => 
        <button onClick={() => moveSpecificPage(pageNum)} key={pageNum} css={pageNum === currentPage ? [pageButtonStyle, currentButtonStyle] : [pageButtonStyle]}>
          {pageNum}
        </button>
      )}
      <button onClick={moveNextPage} css={pageButtonStyle} disabled={isDisableMoveToNext}>다음</button>
      <button onClick={moveLastPage} css={pageButtonStyle} disabled={isDisableMoveToNext}>끝</button>
    </div>
  )
}

const container = css`
  display: flex;
  padding: 30px 200px 0px 200px;
  justify-content: space-around;
`

const pageButtonStyle = css`
  min-width: 2rem;
  height: 2rem;
  border: none;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: rgb(105, 88, 131);
  }
  &:active {
    background-color: rgb(94, 78, 117);
  }
  &:disabled {
    color: gray;
    cursor: default;
    &:hover {
      background-color: transparent;
    }
    &:active {
      background-color: transparent;
    }
  }
  border-radius: 500px;
  font-size: 16px;
  color: white;
`

const currentButtonStyle = css`
  background-color: rgb(117, 98, 146);
`

export default Pagination