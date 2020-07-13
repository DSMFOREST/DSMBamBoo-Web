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
    communityStore: {
      rules,
      studentQuestion,
      getStudentQuestionStatus,
      submitStudentAnswerStatus,
    },
    communityReducer: { getCommunityRules, getStudentQuestion, resetStatus },
  } = useCommunityRedux();
  const [modalType, setModalType] = useState<"notice" | "report">("notice");
  const [isLoading, setIsLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const modalHandler = useCallback((type: "notice" | "report") => {
    setModalType(type);
  }, []);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      setIsLoading(true);

      getCommunityRules({ accessToken: access_token });
      getStudentQuestion({ accessToken: access_token });
    }
  }, [didMountRef, access_token, getCommunityRules, getStudentQuestion]);

  useEffect(() => {
    const { _200 } = responseStatus(getStudentQuestionStatus);

    if (_200) {
      setIsLoading(false);
    }

    resetStatus();
  }, [getStudentQuestionStatus, resetStatus]);

  useEffect(() => {
    const { _200 } = responseStatus(submitStudentAnswerStatus);

    if (_200) {
      setIsStudent(true);
      setModalType("report");
    }

    resetStatus();
  }, [submitStudentAnswerStatus, resetStatus]);

  return (
    <ModalWrapper handleModal={handleReportModal}>
      <S.Wrapper>
        <header>
          <p>제보하기</p>
          <S.CloseButton onClick={handleReportModal}>✕</S.CloseButton>
        </header>
        <section>
          <ModalHeader
            modalType={modalType}
            modalHandler={modalHandler}
            isStudent={isStudent}
          />
          {modalType === "notice" ? (
            <NoticeContent isStudent={isStudent} isLoading={isLoading} />
          ) : (
            <ReportContent />
          )}
        </section>
      </S.Wrapper>
    </ModalWrapper>
  );
};

export default Report;
