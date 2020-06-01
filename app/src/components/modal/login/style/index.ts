import styled from "styled-components";

import { COLORS } from "src/styles/GlobalStyle";
import { downToUp, suddenMotion } from "src/styles/animtaion";

export const Wrapper = styled.div`
  width: 300px;
  height: 320px;
  background: #697c4e;
  border-radius: 10px;

  > section {
    width: 100%;
    height: 280px;
    position: relative;
    background: #fff;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 30px;
    box-sizing: border-box;
  }

  > button {
    width: 100%;
    height: 40px;
    text-align: center;
    color: #fff;
    font-size: 1em;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #95989a;
  width: 18px;
  height: 18px;
  font-size: 1em;
`;

export const Title = styled.p<{ isBig?: boolean }>`
  font-size: ${({ isBig }) => (isBig ? "1.25em" : "1em")};
  color: #707070;
  font-family: "나눔고딕 Bold";
  text-align: center;
  margin: ${({ isBig }) => (isBig ? "0 0 4px" : "8px 0 40px")};
`;

export const InputLabel = styled.label<{ isFailed?: boolean }>`
  width: 100%;
  border-bottom: 1px solid #e1e1e1;
  margin: 0 0 10px;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  position: relative;

  > span {
    width: 15%;
    text-align: center;
    font-family: "나눔고딕 Bold";
    color: #697c4e;
    font-size: 0.7em;
  }

  > input {
    width: 75%;
    height: 30px;
    color: #444444;
    font-size: 0.7em;
    border: none;
  }

  ${({ isFailed }) =>
    isFailed &&
    `
  &::after {
    content: "ID 또는 PW가 틀렸습니다.";
    color: #ff7070;
    position: absolute;
    right: 0;
    bottom: -22px;
    font-size: 0.425em;
  }`};
`;
