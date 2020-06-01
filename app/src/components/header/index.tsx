import React, { FC } from "react";

import { useModalRedux } from "container/modal";
import Logo from "components/common/Logo";
import * as S from "./style";

const Header: FC = () => {
  const {
    modalReducer: { handleLoginModal },
  } = useModalRedux();

  return (
    <S.Wrapper>
      <div>
        <Logo />
        <S.LoginButton onClick={handleLoginModal}>관리자 로그인</S.LoginButton>
      </div>
    </S.Wrapper>
  );
};

export default Header;
