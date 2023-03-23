import React from "react";
import DiscountGamePrice from "./DiscountGamePrice";
import DiscountGameTag from "./DiscountGameTag";

type DiscountGameDetailProps = {
  discountPercent?: number;
  originalPrice?: number;
  finalPrice?: number;
  largeImage?: string;
  smallImage?: string;
};

function DiscountGameDetail(props: DiscountGameDetailProps) {
  return (
    <div>
      <p>DiscountGameDetail</p>
      <p>{props.discountPercent}</p>
      <p>{props.finalPrice}</p>
      <p>{props.originalPrice}</p>
      <DiscountGameTag />
      <DiscountGamePrice />
    </div>
  );
}

export default DiscountGameDetail;
