import React, { FC } from "react";

import { useAuthRedux } from "container/auth";
import { useModalRedux } from "container/modal";
import Logo from "components/common/Logo";
import * as S from "./style";

const Header: FC = () => {
  const {
    modalReducer: { handleLoginModal },
  } = useModalRedux();
  const {
    authStore: { refresh_token },
  } = useAuthRedux();

  return (
    <S.Wrapper>
      <div>
        <Logo />
        <S.LoginButton onClick={refresh_token ? undefined : handleLoginModal}>
          {refresh_token ? "환영합니다." : "관리자 로그인"}
        </S.LoginButton>
      </div>
    </S.Wrapper>
  );
};

export default Header;
