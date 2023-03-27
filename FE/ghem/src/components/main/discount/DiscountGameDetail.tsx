import React from "react";

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
      <p>{props.discountPercent}%</p>
      <p>{props.originalPrice}→</p>
      <p>{props.finalPrice}</p>
    </div>
  );
}

export default DiscountGameDetail;
