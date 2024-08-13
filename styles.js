import { createGlobalStyle } from "styled-components";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${nunito.style.fontFamily}, system-ui;
  }
`;
