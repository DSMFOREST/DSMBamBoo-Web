import styled from "styled-components";

import { BackgroundImg } from "assets/index";
import { THEMA } from "styles/GlobalStyle";

export const Wrapper = styled.div`
  width: 100%;
  height: 44vh;
  background-image: url(${BackgroundImg});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  > section {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: rgba(235, 254, 216, 0.5);

    > div {
      position: absolute;
      bottom: 0;
    }
  }
`;

export const Title = styled.p`
  color: ${THEMA.fontColor2};
  font-size: 2em;

  > span {
    font-weight: bold;
  }
`;

export const Actions = styled.div`
  min-width: 600px;
  width: 60vw;
  height: 9vh;
  display: flex;

  > button {
    width: inherit;
    height: 100%;
    font-size: 1.35em;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: rgba(63, 80, 53, 0.7);

    &.white {
      color: #444;
      background-color: rgba(255, 255, 255, 0.7);
    }

    &.left {
      border-top-left-radius: 30px;
    }

    &.right {
      border-top-right-radius: 30px;
    }
  }
`;
