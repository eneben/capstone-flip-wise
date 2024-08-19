import { createGlobalStyle } from "styled-components";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${nunito.style.fontFamily}, system-ui;
  }

input, select, button {
  font-family: ${nunito.style.fontFamily}, system-ui;
}

`;
