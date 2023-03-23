import React, {useState}from 'react';
import { CategoryData } from './CategoryTestData';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router';



function CategorySelect() {
  const navigate = useNavigate()
  const [selectedList, setSelectedList] = useState<string[]>([])
  

  const onSelectedItem = ( checked:boolean, item:string) => {
    if (checked) {
      setSelectedList([...selectedList,item]);

    }
    else if(!checked) {
      setSelectedList(selectedList.filter(el => el !== item));
    }
  }

  const onRemove = (item:string) => {
    setSelectedList(selectedList.filter(el => el !== item));
  }

  const onMoveToChoice = () => {
    navigate("/choicegame")
  }

  return (
    <div>
      <div>
        {selectedList.length}
      </div>
      <div>
        {selectedList.length >= 3 ? <button onClick={onMoveToChoice}>이동하기</button>:null}
      </div>
      <div>
        {selectedList.length === 0 && (
          <div>카테고리를 지정해 주세요</div>
        )}
      {selectedList.map(item =>{
        return (
          <div key={item}>
            <div>{item}</div>
            <div onClick={() => onRemove(item)}>X</div>
          </div>
        )
      })}
      </div>
      <div css={item}>
        {CategoryData.map(item => {
          return(
            <label key={item.id}>
              <input
              type="checkbox"
              value={item.gerne}
              onChange={e =>{onSelectedItem(e.target.checked, e.target.value);}}
              checked={selectedList.includes(item.gerne)? true:false }
              />
              <div>{item.gerne}</div>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default CategorySelect

const item = css`
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;

 div{
  width: 30%;
 }
`
