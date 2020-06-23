import styled from "styled-components";

import { THEMA } from "styles/GlobalStyle";

export const Wrapper = styled.div`
  width: 600px;
  height: 420px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(105, 124, 78, 0.61);
  border: solid 2px ${THEMA.main1};

  > header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: ${THEMA.defaultShadow};

    > p {
      font-size: 0.925em;
      font-family: "나눔고딕 Bold";
      margin-left: 40px;
      color: ${THEMA.fontColor1};
    }
  }
`;

export const CloseButton = styled.button`
  color: #95989a;
  width: 18px;
  height: 18px;
  font-size: 1em;
  margin-right: 20px;
`;
