import styled from "styled-components";

import { COLORS } from "src/styles/GlobalStyle";
import { downToUp, suddenMotion } from "src/styles/animtaion";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(35, 35, 35, 0.53);
  display: flex;
  justify-content: center;
  align-items: center;
`;
