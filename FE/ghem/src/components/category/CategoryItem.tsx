// import React, { HTMLAttributes, useState } from "react";
// import styled from "@emotion/styled";

// type categoryProps = {
//   key: number;
//   gerne: string;
//   image: string;
// };

// type SelectedProps = {
//     isSelected:HTMLAttributes<HTMLDivElement>
//     setIsSeleted:React.Dispatch<React.SetStateAction<string |undefined>>
// }



// function CategoryItem({ key, gerne, image }: categoryProps,{setIsSeleted,isSelected}:SelectedProps) {
//   const [isChecked, setIsChecked] = useState<Boolean>(false);

//   const SelectHandler = () =>{
//     // setIsSeleted(gerne)
//     console.log(gerne)
//     console.log(isSelected)
//   }

//   return (
//     <div key={key} onClick={SelectHandler}>
//       <div>{image}</div>
//       <div>{gerne}</div>
//     </div>
//   );
// }

// export default CategoryItem;

// const CheckBox = styled.input``;
// const CategoryClick = styled.div`
//   background-color: blue;
// `;
