import React, { FC, useState, useEffect, useCallback } from "react";

import { LoadingImg } from "assets/index";
import { useAuthRedux } from "container/auth";
import { useModalRedux } from "container/modal";
import { responseStatus } from "data/reducers/index";
import ModalWrapper from "../ModalWrapper";
import * as S from "./style";

const Login: FC = () => {
  const {
    modalReducer: { handleLoginModal },
  } = useModalRedux();
  const {
    authStore: { adminLoginStatus },
    authReducer: { adminLogin, resetStatus },
  } = useAuthRedux();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleUsername = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(value);
    },
    []
  );
  const handlePassword = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(value);
    },
    []
  );

  const login = useCallback(() => {
    setIsLoading(true);
    adminLogin({ username, password });
    setPassword("");
  }, [adminLogin, username, password]);

  const onPressEnter = useCallback(
    ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === "Enter") {
        login();
      }
    },
    [login]
  );

  useEffect(() => {
    const { _200, _400, _403 } = responseStatus(adminLoginStatus);

    if (_200) {
      setIsFailed(false);
      handleLoginModal();
    } else if (_400) {
      setIsFailed(true);
      setErrMessage("비어있는 값이 있습니다.");
    } else if (_403) {
      setIsFailed(true);
      setErrMessage("로그인 정보를 확인해주시기 바랍니다.");
    }

    setIsLoading(false);
    resetStatus();
  }, [adminLoginStatus, handleLoginModal, resetStatus]);

  return (
    <ModalWrapper handleModal={handleLoginModal}>
      <S.Wrapper>
        <section>
          <S.CloseButton onClick={handleLoginModal}>✕</S.CloseButton>
          <S.Title isBig>대나무숲</S.Title>
          <S.Title>관리자 로그인</S.Title>
          <S.InputLabel>
            <span>ID</span>
            <input
              value={username}
              onChange={handleUsername}
              placeholder="dsmbamboo123"
              onKeyPress={onPressEnter}
              type="text"
            />
          </S.InputLabel>
          <S.InputLabel isShow={isFailed}>
            <span>PW</span>
            <input
              value={password}
              onChange={handlePassword}
              placeholder="●●●●●●●"
              onKeyPress={onPressEnter}
              type="password"
            />
            <span className="warning">{errMessage}</span>
          </S.InputLabel>
        </section>
        {isLoading ? (
          <div className="loading">
            <img src={LoadingImg} alt="로딩중..." />
          </div>
        ) : (
          <button onClick={login}>로그인</button>
        )}
      </S.Wrapper>
    </ModalWrapper>
  );
};

export default Login;
