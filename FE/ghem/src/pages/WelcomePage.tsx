import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { Routes, Route } from "react-router";
import CategoryPage from "./CategoryPage";
import ChoiceGamePage from "./ChoiceGamePage";
import WelcomeContainer from "@components/welcome/WelcomeContainer";

function WelcomePage() {
  return (
    <div>
      <Routes>
        <Route path="/cateogory" element={<CategoryPage />} />
        <Route path="/choicegame" element={<ChoiceGamePage />} />
        <Route path="/" element={<WelcomeContainer />} />
      </Routes>
    </div>
  );
}



export default WelcomePage;