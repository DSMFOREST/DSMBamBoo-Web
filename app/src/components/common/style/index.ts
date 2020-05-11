import styled from "styled-components";
import GothicBold from "assets/font/NanumGothicBold.ttf";
import GothicLight from "assets/font/NanumGothicLight.ttf";

export const Logo = styled.p`
  font-size: 1.8em;
  line-height: 1.15;
  color: #607151;
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
    align-items: center;
  }
`;

export const Category = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;

  > button {
    display: flex;
    align-items: center;
    padding: 2px;
    color: #707070;
    font-size: 1em;

    > i {
      width: 0;
      height: 0;
      margin-left: 8px;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #707070;
    }
  }
`;

export const InputBox = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;

  > input {
    width: 88%;
    color: #707070;
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
      color: #444444;
      font-family: ${GothicBold};
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
        background: #f7f7f7;
        cursor: pointer;
      }

      > td {
        text-align: center;
        font-family: ${GothicLight};
        font-size: 0.8em;
        color: #444444;
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
