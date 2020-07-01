import {
  createGlobalStyle,
  GlobalStyleComponent,
  DefaultTheme,
} from "styled-components";

export enum THEMA {
  main1 = "#697c4e",
  main2 = "#607151",
  main3 = "#7bbb5a",
  fontColor1 = "#707070",
  fontColor2 = "#444444",
  fontColor3 = "#f7f7f7",
  fontColor4 = "#f9f9f9",
  fontColor5 = "#d1d1d1",
  arraw = "#abb4a3",
  defaultShadow = "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
}

const GlobalStyle: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
  ::-moz-selection {
    background: #c5c5c5;
    color: #000;
  }
  ::selection {
    background: #c5c5c5;
    color: #000;
  }

  html, body {
    width: 100%;
    min-width: 600px;
    font-family: '나눔고딕', sans-serif;
  }

  .HS {
    font-family: 'HS봄바람체 2.0', sans-serif;
  }

  input, textarea {
    &:-webkit-autofill {
      box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.8) inset;
    }

    &[type=password] {
      font-family: sans-serif;
    }

    &:focus {
      outline: none;
    }
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
  }

  hr {
    margin: 0;
    padding: 0;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }

  a {
    &:link{
      text-decoration: none;
    }
    &:visited{
      text-decoration: none;
    }
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  div {
    &::-webkit-scrollbar {
      width: 6px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      width: 6px;
      background: #607151;
    }
  }

  button {
    margin: 0;
    padding: 0;
    cursor: pointer;
    background: unset;
    color: unset;
    border: none;
  }
`;

export default GlobalStyle;
