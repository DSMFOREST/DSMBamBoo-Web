import React, { FC, useState, useEffect, useRef, useCallback } from "react";

import { useModalRedux } from "container/modal";
import ModalWrapper from "../ModalWrapper";
import * as S from "./style";

const Report: FC = () => {
  const {
    modalReducer: { handleReportModal },
  } = useModalRedux();

  return (
    <ModalWrapper handleModal={handleReportModal}>
      <S.Wrapper>
        <header>
          <p>제보하기</p>
          <S.CloseButton onClick={handleReportModal}>✕</S.CloseButton>
        </header>
      </S.Wrapper>
    </ModalWrapper>
  );
};

export default Report;
