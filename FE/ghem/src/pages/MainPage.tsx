import React from "react";
import Banner from "../components/main/Banner";
import Discount from "../components/main/Discount";
import FriendRecommend from "../components/main/FriendRecommend";
import SteadySeller from "../components/main/SteadySeller";
import TopRankNewRelease from "../components/main/TopRankNewRelease";

function MainPage() {
  return (
    <div>
      MainPage
      <Banner />
      <Discount />
      <TopRankNewRelease />
      <hr />
      <FriendRecommend />
      <SteadySeller />
      먼가 깐지나는 말
    </div>
  );
}

export default MainPage;
