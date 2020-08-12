import styled from "styled-components";
import { Link } from "react-router-dom";

import { THEMA } from "styles/GlobalStyle";

export const Wrapper = styled.footer`
  width: 100%;
  padding: 0 5.4% 0 7%;
  box-sizing: border-box;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 1.8em;
  margin-bottom: 30px;

  > h1 {
    color: ${THEMA.main2};
    font-size: 1.8em;
    font-weight: 100;
  }

  > p {
    color: ${THEMA.fontColor8};
    font-size: 1em;
  }
`;

export const Button = styled(Link)`
  margin-left: 40px;
  color: inherit;
`;

export const Infomation = styled.div`
  display: flex;
  margin-bottom: 70px;

  > p {
    min-width: 50px;
    margin-right: 10vw;
    color: #000;
    font-size: 1em;

    > span {
      margin-top: 40px;
      display: block;
    }
  }
`;
