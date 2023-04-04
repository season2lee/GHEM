import { Global, css } from "@emotion/react";
import steamLogo from "@/assets/image/steamLogo.png"

function GlobalStyles() {
  return <Global styles={globalStyles} />;
}

const globalStyles = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css");

  h1 {
    font-size: 2.125rem;
  }

  h2 {
    font-size: 1.875rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  h5 {
    font-size: 1.125rem;
  }

  h6,
  p {
    font-size: 1rem;
  }

  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    box-sizing: border-box;
    font-family: "Pretendard";
    cursor:crosshair
  }

  html {
    
    font-size: 18px;
    background-color: #292233;
    color: white;

  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: initial;
    border-radius: 10px;
  }
`;
export default GlobalStyles;
