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
      DiscountGameDetail
      {props.discountPercent}
      {props.finalPrice}
      {props.originalPrice}
      <DiscountGameTag />
      <DiscountGamePrice />
    </div>
  );
}

export default DiscountGameDetail;
