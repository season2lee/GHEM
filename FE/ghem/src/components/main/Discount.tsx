import { css } from "@emotion/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CommonGameList from "./game/CommonGameList";
import { PageXY } from "@/pages/MainPage";
import { mobile } from "@/util/Mixin";

type DiscountList = {
  appid: number;
  discountPercent: number;
  originalPrice: number;
  finalPrice: number;
  largeImage: string;
  smallImage: string;
  headerImage: string;
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
  header_image: string;
};

type DiscountProps = {
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
  canClickWithHover: boolean;
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
        "https://c4q3ics2qk.execute-api.ap-northeast-2.amazonaws.com/test/featuredcategories?l=korean"
        // "https://store.steampowered.com/api/featuredcategories"
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
              headerImage: special.header_image,
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
      <span css={discountText}>IN DISCOUNT</span>
      <CommonGameList
        gameType="discount"
        gameList={discountList}
        imgType="header"
        scrollType={1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        setPageXY={props.setPageXY}
        canClickWithHover={props.canClickWithHover}
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
  ${mobile} {
    > span {
      font-size: 30px;
    }
    margin: 3rem 1rem;
    padding: 1rem 0rem;
    border-radius: 20px;
  }
`;

const discountText = css`
  color: #352c42;
  text-shadow: -1px 0px #f6b4ff, 0 0 2px #fff, 0 0 8px #ffd8f8, 0 0 4px #fff,
    0px 1px #f1c1ff, 1px 0px #ffd8f8, 0px -1px #ffa9cb;
  /* text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
    0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb; */
`;

export default Discount;
