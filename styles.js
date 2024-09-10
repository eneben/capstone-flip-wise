import { createGlobalStyle } from "styled-components";
import { Barlow, Barlow_Semi_Condensed } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const barlowSemi = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
overflow-wrap: break-word;
  }

  body {
    font-family: ${barlow.style.fontFamily}, system-ui;

  }

input, select, button {
  font-family: inherit;
}

`;
