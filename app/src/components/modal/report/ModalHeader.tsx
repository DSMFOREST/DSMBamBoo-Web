import React, { FC } from "react";

import * as S from "./style";

interface OwnProps {
  modalHandler: (type: "notice" | "report") => void;
  modalType: "notice" | "report";
}

const ModalHeader: FC<OwnProps> = ({ modalHandler, modalType }) => {
  return (
    <article>
      <S.ModalButton
        onClick={() => modalHandler("notice")}
        isLast={false}
        isActive={modalType === "notice"}
      >
        필수 공지
      </S.ModalButton>
      <S.ModalButton
        onClick={() => modalHandler("report")}
        isLast={true}
        isActive={modalType === "report"}
      >
        제보하기
      </S.ModalButton>
    </article>
  );
};

export default ModalHeader;
