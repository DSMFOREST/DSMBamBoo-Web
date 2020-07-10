import React, { FC, useState, useCallback, useEffect, useRef } from "react";

import { useAuthRedux } from "container/auth";
import { useCommunityRedux } from "container/community";
import { useModalRedux } from "container/modal";
import { responseStatus } from "data/reducers";
import ModalWrapper from "../ModalWrapper";
import ModalHeader from "./ModalHeader";
import NoticeContent from "./NoticeContent";
import ReportContent from "./ReportContent";
import * as S from "./style";

const Report: FC = () => {
  const didMountRef = useRef(false);
  const {
    authStore: { access_token },
  } = useAuthRedux();
  const {
    modalReducer: { handleReportModal },
  } = useModalRedux();
  const {
    communityStore: { rules },
    communityReducer: { getCommunityRules },
  } = useCommunityRedux();
  const [modalType, setModalType] = useState<"notice" | "report">("notice");

  const modalHandler = useCallback((type: "notice" | "report") => {
    setModalType(type);
  }, []);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      getCommunityRules({ accessToken: access_token });
    }
  }, [didMountRef, access_token, getCommunityRules]);

  return (
    <ModalWrapper handleModal={handleReportModal}>
      <S.Wrapper>
        <header>
          <p>제보하기</p>
          <S.CloseButton onClick={handleReportModal}>✕</S.CloseButton>
        </header>
        <section>
          <ModalHeader modalType={modalType} modalHandler={modalHandler} />
          {modalType === "notice" ? (
            <NoticeContent rules={rules} />
          ) : (
            <ReportContent />
          )}
        </section>
      </S.Wrapper>
    </ModalWrapper>
  );
};

export default Report;
