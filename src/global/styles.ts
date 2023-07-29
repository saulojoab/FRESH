import { createGlobalStyle } from "styled-components";
import MontserratBlack from "@/assets/fonts/Montserrat-Black.ttf";
import MontserratBlackItalic from "@/assets/fonts/Montserrat-BlackItalic.ttf";
import MontserratBold from "@/assets/fonts/Montserrat-Bold.ttf";
import MontserratBoldItalic from "@/assets/fonts/Montserrat-BoldItalic.ttf";
import MontserratLight from "@/assets/fonts/Montserrat-Light.ttf";
import MontserratLightItalic from "@/assets/fonts/Montserrat-LightItalic.ttf";
import MontserratMedium from "@/assets/fonts/Montserrat-Medium.ttf";
import MontserratMediumItalic from "@/assets/fonts/Montserrat-MediumItalic.ttf";
import MontserratRegular from "@/assets/fonts/Montserrat-Regular.ttf";
import MontserratItalic from "@/assets/fonts/Montserrat-Italic.ttf";
import MontserratSemibold from "@/assets/fonts/Montserrat-Semibold.ttf";
import MontserratSemiboldItalic from "@/assets/fonts/Montserrat-SemiboldItalic.ttf";
import MontserratThin from "@/assets/fonts/Montserrat-Thin.ttf";
import MontserratThinItalic from "@/assets/fonts/Montserrat-ThinItalic.ttf";

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: MontserratRegular;
  }

  html, body, #app, #app>div, #root {
  height: 100%
}

  @font-face {
  font-family: 'MontserratBlack';
  src: url(${MontserratBlack}) format('truetype');
}

@font-face {
  font-family: 'MontserratBlackItalic';
  src: url(${MontserratBlackItalic}) format('truetype');
}

@font-face {
  font-family: 'MontserratBold';
  src: url(${MontserratBold}) format('truetype');
}

@font-face {
  font-family: 'MontserratBoldItalic';
  src: url(${MontserratBoldItalic}) format('truetype');
}

@font-face {
  font-family: 'MontserratLight';
  src: url(${MontserratLight}) format('truetype');
}

@font-face {
  font-family: 'MontserratLightItalic';
  src: url(${MontserratLightItalic}) format('truetype');
}

@font-face {
  font-family: 'MontserratMedium';
  src: url(${MontserratMedium}) format('truetype');
}

@font-face {
  font-family: 'MontserratMediumItalic';
  src: url(${MontserratMediumItalic}) format('truetype');
}

@font-face {
  font-family: 'MontserratRegular';
  src: url(${MontserratRegular}) format('truetype');
}

@font-face {
  font-family: 'MontserratItalic';
  src: url(${MontserratItalic}) format('truetype');
}

@font-face {
  font-family: 'MontserratSemibold';
  src: url(${MontserratSemibold}) format('truetype');
}

@font-face {
  font-family: 'MontserratSemiboldItalic';
  src: url(${MontserratSemiboldItalic}) format('truetype');
}

@font-face {
  font-family: 'MontserratThin';
  src: url(${MontserratThin}) format('truetype');
}

@font-face {
  font-family: 'MontserratThinItalic';
  src: url(${MontserratThinItalic}) format('truetype');
}
`;

export default Global;
