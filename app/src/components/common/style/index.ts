import styled from "styled-components";

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
  position: relative;

  > button.refresh {
    position: absolute;
    top: 10px;
    left: 0;
    width: 30px;
    height: 30px;
    padding: 4px;
    border-radius: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f3f2f2;
    transition: 0.2s;

    > img {
      position: relative;
      width: 16px;
      height: 16px;
    }

    &:hover {
      background: #e2e1e1;
    }
  }

  > button.shuffle {
    position: absolute;
    top: 10px;
    right: 0;
    width: 30px;
    height: 30px;
    padding: 4px;
    border-radius: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f3f2f2;
    transition: 0.2s;

    > div.description {
      display: none;
      position: relative;
      background: #f3f2f2;
      border-radius: 2px;
      position: absolute;
      right: -85px;

      > p {
        width: 70px;
        height: 20px;
        line-height: 20px;
        color: #8e8e8e;
        font-size: 12px;
      }

      &:after {
        right: 100%;
        top: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-right-color: #f3f2f2;
        border-width: 6px;
        margin-top: -6px;
      }
    }

    > img {
      position: relative;
      width: 16px;
      height: 16px;
    }

    &:hover {
      background: #e2e1e1;

      > div.description {
        display: block;
      }
    }
  }

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
  }
`;

export const EmptyTr = styled.tr`
  > td {
    padding: 16px;
    box-sizing: border-box;
    text-align: center;
    font-size: 1em;
  }
`;

export const Tr = styled.tr<{ isActive: boolean; isLogin: boolean }>`
  transition: 0.2s;

  &:hover {
    background: ${THEMA.fontColor3};
    cursor: pointer;
  }

  > td {
    text-align: center;
    font-family: "나눔고딕 Light";
    font-size: 0.8em;
    color: ${({ isActive }) => (isActive ? THEMA.main2 : THEMA.fontColor2)};
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
`;

export const DetailReportWrapper = styled.div`
  width: 100%;
  margin: 20px 0;

  > h1 {
    color: ${THEMA.main2};
    font-family: "나눔고딕";
    font-size: 1.285em;
    font-weight: bold;
    margin: 8px 0;
  }

  > h2 {
    color: #000000;
    font-family: "나눔고딕";
    font-size: 1.285em;
    font-weight: bold;
    margin: 4px 0;
  }

  > article {
    width: 100%;
    padding: 10px 4px;
    border-top: 3px solid ${THEMA.main2};
    border-bottom: 1px solid ${THEMA.main2};
    display: flex;
    justify-content: space-between;

    > p {
      font-size: 0.825em;
      color: ${THEMA.main4};
      display: flex;
      align-items: center;

      > img {
        width: 0.825em;
        height: 0.825em;
        margin: 0 2px;
      }

      > span {
        color: ${THEMA.main5};
      }
    }
  }

  section {
    width: 100%;
    padding: 16px 12px;
    box-sizing: border-box;

    > p {
      color: ${THEMA.fontColor2};
      line-height: 1.5;
      font-family: "나눔고딕";
      font-size: 0.9em;
      white-space: pre-line;
    }

    div.imageWrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 30px 0;

      > img {
        max-width: 100%;
        min-width: 40%;
        margin-bottom: 15px;
      }
    }
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 25px 0;

    > a {
      font-size: 0.825em;
      color: #000000;
      font-family: "나눔고딕";
      font-weight: bold;
      display: flex;
      align-items: center;

      > img.facebook {
        width: 30px;
        height: 30px;
        margin-right: 12px;
      }

      > img.open {
        width: 1em;
        height: 1em;
      }
    }
  }
`;

export const CategorySpan = styled.span`
  margin-left: 10px;
`;

export const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > img {
    width: 30px;
    height: 30px;
  }
`;
