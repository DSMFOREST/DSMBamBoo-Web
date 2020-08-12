import styled from "styled-components";
import { Link } from "react-router-dom";

import { THEMA } from "styles/GlobalStyle";

export const Wrapper = styled.header`
  width: 100%;
  height: 11vh;

  > div {
    width: 100%;
    height: 100%;
    padding: 0 5.4% 0 7%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const HomeButton = styled(Link)`
  all: unset;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  font-size: 1em;
  color: ${THEMA.fontColor2};
`;
