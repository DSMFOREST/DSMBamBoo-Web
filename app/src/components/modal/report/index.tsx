import React, { FC, useState, useCallback } from "react";

import { useModalRedux } from "container/modal";
import ModalWrapper from "../ModalWrapper";
import ModalHeader from "./ModalHeader";
import NoticeContent from "./NoticeContent";
import ReportContent from "./ReportContent";
import * as S from "./style";

const Report: FC = () => {
  const {
    modalReducer: { handleReportModal },
  } = useModalRedux();
  const [modalType, setModalType] = useState<"notice" | "report">("notice");

  const modalHandler = useCallback((type: "notice" | "report") => {
    setModalType(type);
  }, []);

  return (
    <ModalWrapper handleModal={handleReportModal}>
      <S.Wrapper>
        <header>
          <p>제보하기</p>
          <S.CloseButton onClick={handleReportModal}>✕</S.CloseButton>
        </header>
        <section>
          <ModalHeader modalType={modalType} modalHandler={modalHandler} />
          {modalType === "notice" ? <NoticeContent /> : <ReportContent />}
        </section>
      </S.Wrapper>
    </ModalWrapper>
  );
};

export default Report;
