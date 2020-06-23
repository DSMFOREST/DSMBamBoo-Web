import styled from "styled-components";

import { THEMA } from "styles/GlobalStyle";

export const Wrapper = styled.div`
  > section {
    min-width: 514px;
    width: 100%;
    height: calc(100vh - 60px);
    background: ${THEMA.fontColor4};
    display: flex;
    justify-content: center;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;

  > div {
    width: 60vw;
    min-width: 600px;
    height: 100%;
  }
`;
