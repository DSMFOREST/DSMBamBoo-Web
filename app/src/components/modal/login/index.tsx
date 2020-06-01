import React, { FC, useState, useEffect, useRef, useCallback } from "react";

import { LoadingImg } from "assets/index";
import { useModalRedux } from "container/modal";
import ModalWrapper from "../ModalWrapper";
import * as S from "./style";

const Login: FC = () => {
  const {
    modalReducer: { handleLoginModal },
  } = useModalRedux();

  return (
    <ModalWrapper handleModal={handleLoginModal}>
      <S.Wrapper>
        <section>
          <S.CloseButton onClick={handleLoginModal}>✕</S.CloseButton>
          <S.Title isBig>대나무숲</S.Title>
          <S.Title>관리자 로그인</S.Title>
          <S.InputLabel>
            <span>ID</span>
            <input placeholder="dsmbamboo123" type="text" />
          </S.InputLabel>
          <S.InputLabel isFailed={true}>
            <span>PW</span>
            <input placeholder="●●●●●●●" type="password" />
          </S.InputLabel>
        </section>
        <button>로그인</button>
      </S.Wrapper>
    </ModalWrapper>
  );
};

export default Login;
