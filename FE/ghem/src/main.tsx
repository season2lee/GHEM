import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import GlobalStyles from "./GlobalStyles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <GlobalStyles />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);
