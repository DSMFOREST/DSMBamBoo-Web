import React, { FC, useState, useEffect, useRef, useCallback } from "react";

import * as S from "./style";

interface OwnProps {
  handleModal: () => void;
}

const ModalWrapper: FC<OwnProps> = ({ children, handleModal }) => {
  const stopPropagation = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
    },
    []
  );

  return (
    <S.Wrapper onClick={handleModal}>
      <div onClick={stopPropagation}>{children}</div>
    </S.Wrapper>
  );
};

export default ModalWrapper;
