import styled, { css } from "styled-components";

import { THEMA } from "styles/GlobalStyle";

export const Logo = styled.p`
  font-size: 1.8em;
  line-height: 1.15;
  color: ${THEMA.main2};
`;

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > div {
    width: 56vw;
    min-width: 600px;
    height: 6vh;
    border-radius: 10px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.11);
    background-color: #ffffff;
    margin: 10px 0;
    display: flex;
  }
`;

export const Category = styled.div<{ isDropDown: boolean }>`
  width: 25%;
  height: ${({ isDropDown }) => (isDropDown ? "18vh" : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  z-index: 10;
  border-radius: 10px;
  border-top-right-radius: 0;
  box-shadow: ${({ isDropDown }) => isDropDown && THEMA.defaultShadow};

  > button {
    width: 100%;
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    box-sizing: border-box;
    color: ${THEMA.fontColor1};
    font-size: 0.85em;
  }

  > hr {
    width: 90%;
    background: ${THEMA.fontColor5};
  }
`;

export const UpDownIcon = styled.i<{ isUp: boolean }>`
  width: 0;
  height: 0;
  margin-left: 8px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  ${({ isUp }) =>
    isUp
      ? `border-bottom: 4px solid ${THEMA.fontColor1};`
      : `border-top: 4px solid ${THEMA.fontColor1};`}
`;

export const InputBox = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;

  > input {
    width: 88%;
    color: ${THEMA.fontColor1};
    font-size: 1em;
    border: none;
  }
`;

export const TableWrapper = styled.div<{ isLogin: boolean }>`
  width: 100%;
  margin-bottom: 6vh;

  > table {
    width: 100%;
    border-collapse: collapse;

    > thead > tr > td {
      text-align: center;
      color: ${THEMA.fontColor2};
      font-family: "나눔고딕 Bold";
      font-size: 0.9em;
      border-bottom: 1px solid #707070;
      padding: 1.5rem 0 1rem;

      &.index {
        width: 23%;
      }

      &.title {
        width: ${({ isLogin }) => (isLogin ? "31%" : "54%")};
        padding: 0 10px;
      }

      &.createdAt {
        width: 23%;
      }

      &.check {
        width: 23%;
      }
    }

    > tbody > tr {
      transition: 0.2s;

      &:hover {
        background: ${THEMA.fontColor3};
        cursor: pointer;
      }

      > td {
        text-align: center;
        font-family: "나눔고딕 Light";
        font-size: 0.8em;
        color: ${THEMA.fontColor2};
        padding: 0.825rem 0;

        &.index {
          width: 23%;
          font-weight: bold;
        }

        &.title {
          width: ${({ isLogin }) => (isLogin ? "31%" : "54%")};
          padding: 0 10px;
          font-weight: bold;
          text-align: left;
        }

        &.createdAt {
          width: 23%;
        }

        &.check {
          width: 23%;

          > div {
            display: flex;
            justify-content: space-around;
            align-items: center;

            > button {
              font-size: 1.1em;
              transition: 0.2s;

              &:hover {
                color: #000;
              }
            }
          }
        }
      }
    }
  }
`;
