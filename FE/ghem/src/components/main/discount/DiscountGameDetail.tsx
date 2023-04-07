import { css } from "@emotion/react";
import React from "react";

type DiscountGameDetailProps = {
  discountPercent?: number;
  originalPrice?: number;
  finalPrice?: number;
  largeImage?: string;
  smallImage?: string;
};

function DiscountGameDetail(props: DiscountGameDetailProps) {
  const initialPrice = props.originalPrice?.toString();
  const finalPrice = props.finalPrice?.toString();
  return (
    <div>
      <div css={discountBack}>
        <p css={percentP}>{props.discountPercent}%</p>
      </div>
      <div css={priceBack}>
        {/* <p>
          ₩
          {initialPrice
            ?.substring(0, initialPrice.length - 2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          →
        </p> */}
        <p css={priceP}>
          ₩
          {finalPrice
            ?.substring(0, finalPrice.length - 2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>
    </div>
  );
}

const discountBack = css`
  position: absolute;
  text-align: left;
  display: flex;
  top: 0;
`;

const priceBack = css`
  position: absolute;
  text-align: left;
  display: flex;
  right: 0;
  bottom: 0;
`;

const percentP = css`
  font-weight: 100;
  margin: 0.3rem;
  background-color: #ad99c5;
  padding: 0.1rem;
  border-radius: 3px;
`;

const priceP = css`
  font-weight: 200;
  margin: 0.3rem;
  background-color: #627178e2;
  padding: 0.1rem 0.5rem;
  /* border-radius: 3px; */
`;

export default DiscountGameDetail;
