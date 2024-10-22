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
    -webkit-tap-highlight-color: transparent;
  }

  :root {
    --primary-red: #e76f51;
    --primary-green: #2a9d8f;
    --primary-neutral: #264653;
    --primary-blue: #3ca8dc;
    --secondary-grey: #dee3e5;
    --secondary-mid-grey: #bec7cb;
    --secondary-light-grey: #f4f6f6;

    --border-thickness: 2px;

    --main-headline:  700 1.6rem ${barlow.style.fontFamily}, system-ui;
    --sub-headline:  500 1.1rem ${barlow.style.fontFamily}, system-ui;
    --collection-name:  500 1.4rem ${barlow.style.fontFamily}, system-ui;
    --question-answer: 500 1.2rem ${barlowSemi.style.fontFamily}, system-ui;
    --collection-title: 400 0.9rem ${barlowSemi.style.fontFamily}, system-ui;
    --counter: 500 0.8rem ${barlowSemi.style.fontFamily}, system-ui;
    --form-headline: 700 1.5rem ${barlow.style.fontFamily}, system-ui;
    --form-label: 500 0.9rem ${barlow.style.fontFamily}, system-ui;
    --form-input: 400 0.9rem ${barlowSemi.style.fontFamily}, system-ui;
    --temporary-flashcard-preview-small-headline: 400 0.9rem ${barlowSemi.style.fontFamily}, system-ui;
    --temporary-flashcard-preview-q-and-a: 500 1.1rem ${barlowSemi.style.fontFamily}, system-ui;
    --temporary-flashcard-checkbox-label: 500 1.1rem ${barlowSemi.style.fontFamily}, system-ui;


    --grid-columns-card-and-title: 54px 54px 24px 1fr 24px 54px 54px; 
    --grid-rows-card-and-title: 54px 1fr 54px;

    ::-webkit-scrollbar { display: none; };

scrollbar-width: none; 
overflow: auto;
}

  body {
    font-family: ${barlow.style.fontFamily}, system-ui;
    background: repeating-linear-gradient(
      -45deg,
      #fff 0px,
      #fff 15px,
      var(--secondary-light-grey) 15px,
      var(--secondary-light-grey) 30px
  ); 

  }


input, select, button {
  font-family: inherit;
}

`;
