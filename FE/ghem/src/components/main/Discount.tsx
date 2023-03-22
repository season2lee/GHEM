import { css } from "@emotion/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CommonGameList from "./game/CommonGameList";

type DiscountList = {
  appid: number;
  discountPercent: number;
  originalPrice: number;
  finalPrice: number;
  largeImage: string;
  smallImage: string;
};

type Special = {
  id: number;
  name: string;
  discounted: boolean;
  discount_percent: number;
  original_price: number;
  final_price: number;
  large_capsule_image: string;
  small_capsule_image: string;
};

type DiscountProps = {
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  currentColId: string;
};

function Discount(props: DiscountProps) {
  const [discountList, setDiscountList] = useState<DiscountList[]>([]);

  useEffect(() => {
    DiscountListApi();
    return () => {};
  }, []);

  const DiscountListApi = async () => {
    try {
      const response = await axios.get(
        "https://store.steampowered.com/api/featuredcategories"
      );

      const newDiscountList = response.data.specials.items.map(
        (special: Special) => {
          if (special.discounted === true) {
            return {
              appid: special.id,
              discountPercent: special.discount_percent,
              originalPrice: special.original_price,
              finalPrice: special.final_price,
              largeImage: special.large_capsule_image,
              smallImage: special.small_capsule_image,
            };
          }
        }
      );
      setDiscountList(newDiscountList);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div css={discountDiv}>
      <span>
        <b>IN DISCOUNT</b>
      </span>
      <CommonGameList
        gameType="discount"
        gameList={discountList}
        imgType="header"
        scrollType={1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        colId="discount1"
        currentColId={props.currentColId}
      />
    </div>
  );
}

const discountDiv = css`
  > span {
    font-size: 60px;
  }
  margin: 10rem 6rem;
  padding: 1rem 0rem 1rem 0rem;
  background-color: #352c42;
  border-radius: 30px;
`;

export default Discount;
