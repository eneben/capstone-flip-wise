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

  :root {
    --primary-red: #e76f51;
    --primary-green: #2a9d8f;
    --primary-neutral: #264653;
    --secondary-grey: #dee3e5;
    --secondary-mid-grey: #bec7cb;

    --border-thickness: 2px;

    --main-headline:  700 1.6rem ${barlow.style.fontFamily}, system-ui;
    --sub-headline:  500 1.1rem ${barlow.style.fontFamily}, system-ui;
    --collection-name:  500 1.4rem ${barlow.style.fontFamily}, system-ui;
    --question-answer: 500 1.2rem ${barlowSemi.style.fontFamily}, system-ui;
    --collection-title: 400 0.9rem ${barlowSemi.style.fontFamily}, system-ui;
    --counter: 500 0.8rem ${barlowSemi.style.fontFamily}, system-ui;
    --form-headline: 700 1.5rem ${barlow.style.fontFamily}, system-ui;
}

  body {
    font-family: ${barlow.style.fontFamily}, system-ui;

  }

input, select, button {
  font-family: inherit;
}

`;
