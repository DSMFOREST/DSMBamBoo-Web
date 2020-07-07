import styled from "styled-components";

import { THEMA } from "styles/GlobalStyle";

export const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    text-shadow: ${THEMA.defaultShadow};
    font-family: NanumGothic;
    font-size: 2em;
    font-weight: bold;
    color: #444444;
    padding: 60px 0;
  }

  > p {
    font-size: 1em;
    color: #000;
    margin-bottom: 100px;
    white-space: pre-line;
  }
`;
