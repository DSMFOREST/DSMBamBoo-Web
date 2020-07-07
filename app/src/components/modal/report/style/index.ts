import styled, { css } from "styled-components";

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

  > section {
    width: 100%;
    height: 370px;
    box-sizing: border-box;
    padding: 36px;
    display: flex;
    flex-direction: column;

    > article {
      width: 100%;
    }
  }
`;

interface ModalButtonProps {
  isActive: boolean;
  isLast: boolean;
}
export const ModalButton = styled.button<ModalButtonProps>`
  cursor: pointer;
  width: 92px;
  height: 40px;
  position: relative;
  border: solid 1px #e1e1e1;
  box-sizing: border-box;
  background-color: ${({ isActive }) =>
    isActive ? "#ffffff" : THEMA.fontColor6};
  font-family: "나눔고딕";
  color: ${({ isActive }) => (isActive ? THEMA.main1 : THEMA.fontColor1)};
  border-radius: 6px;
  ${({ isLast }) => (isLast ? isLastModalCSS : isNotLastModalCSS)};
  border-top-right-radius: ${({ isActive }) => isActive && 0};
  border-top-left-radius: ${({ isActive }) => isActive && 0};

  &:after {
    content: "";
    position: absolute;
    top: -1px;
    left: 0px;
    width: 100%;
    height: 4px;
    background: ${({ isActive }) => (isActive ? THEMA.main1 : "transparent")};
  }
`;
const isLastModalCSS = css({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderLeft: 0,
});
const isNotLastModalCSS = css({
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});

export const CloseButton = styled.button`
  color: #95989a;
  width: 18px;
  height: 18px;
  font-size: 1em;
  margin-right: 20px;
`;

export const NoticeContent = styled.article`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: -webkit-fill-available;

  > div {
    width: 100%;
  }
`;

export const TextForm = styled.p`
  font-family: "나눔고딕";
  color: ${THEMA.fontColor1};
  font-size: 0.875em;
  margin-bottom: 6px;

  > span.strong {
    color: ${THEMA.main1};
    font-weight: bold;
  }

  > span.bold {
    font-weight: bold;
  }
`;

export const AnswerLabel = styled.label`
  font-family: "나눔고딕";
  color: ${THEMA.fontColor1};
  font-size: 0.875em;

  > span.bold {
    font-weight: bold;
    margin-right: 4px;
  }

  > span.warning {
    color: #ff7070;
    margin-left: 4px;
    font-size: 0.6em;
  }

  > input {
    background: ${THEMA.fontColor7};
    padding: 3px 6px;
    border: 0;

    &::placeholder {
      color: #d4d4d4;
    }
  }
`;

export const ReportContent = styled.article`
  height: 258px;
  display: flex;
  position: relative;

  > table {
    width: 100%;
    height: 100%;
    border: 1px solid #e1e1e1;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
  }

  tr {
    &.title {
      height: 30px;
    }

    &.category {
      height: 70px;
    }

    &.image {
      height: 45px;
    }

    &.contents {
      height: 100%;
    }
  }

  th,
  td {
    border: 1px solid #e1e1e1;
    text-align: center;
    font-size: 0.825em;
    color: ${THEMA.fontColor2};
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "나눔고딕";
    white-space: nowrap;

    &.contentHeader {
      width: 90px;
    }
  }
`;

export const TitleLabel = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 4px 8px;

  > input {
    width: 100%;
    height: inherit;
    font-size: 0.825em;
    color: ${THEMA.fontColor2};
    font-family: "나눔고딕";
    margin: 0;
    padding: 0;
    border: 0;
  }
`;

export const CategoryChecked = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
  display: grid;
  grid-template-columns: auto auto auto;
  overflow-y: scroll;

  > label {
    text-align: start;
    font-size: 0.825em;
    color: ${THEMA.fontColor2};
    display: flex;
    align-items: center;
    font-family: "나눔고딕";

    > input {
      margin: 0 4px;
      width: inherit;
      height: inherit;
    }
  }
`;

export const ImageSave = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 2px 8px;

  > p {
    text-align: start;
    font-size: 0.825em;
    color: ${THEMA.fontColor2};
    font-family: "나눔고딕";
  }

  > div {
    display: flex;

    > label {
      cursor: pointer;
      border: 0;
      margin: 0;
      padding: 0;
      width: 20px;
      height: 20px;
      background: #f0f0f0;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        width: 14px;
        height: 14px;
      }

      > input {
        display: none;
      }
    }
  }
`;

export const LocalImageButton = styled.button`
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 4px;
  transition: 0.2s ease-in-out;

  > img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.6;
  }
`;

export const ContentInput = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;

  > textarea {
    resize: none;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    font-family: "나눔고딕";
    font-size: 0.825em;
    color: ${THEMA.fontColor2};
    margin: 0;
    padding: 0;
    border: 0;
  }
`;

export const SubmitButton = styled.button`
  position: absolute;
  right: 0;
  bottom: -24px;
  text-shadow: ${THEMA.defaultShadow};
  font-family: "나눔고딕";
  font-size: 0.925em;
  color: ${THEMA.fontColor2};

  > img {
    width: 18px;
    height: 18px;
  }
`;
