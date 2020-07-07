import styled from "styled-components";

import { THEMA } from "styles/GlobalStyle";

export const TitleWrapper = styled.div`
  width: 100%;
  height: 45vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  > p.title {
    margin-top: 7vh;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    font-size: 2em;
    font-weight: bold;
    color: ${THEMA.fontColor2};
  }

  > p.content {
    font-size: 1em;
    color: ${THEMA.main1};
    line-height: 1.16;
  }
`;

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  box-sizing: border-box;

  > img {
    width: 20px;
    height: 20px;
  }
`;

export const Ellipse = styled.i`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${THEMA.main2};
  transform: scaleY(0.3333);
  margin: 4vh 0 5vh;
`;

export const Arrow = styled.i`
  border: solid ${THEMA.arraw};
  border-width: 0 5px 5px 0;
  padding: 5px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  margin-top: 6vh;
`;
