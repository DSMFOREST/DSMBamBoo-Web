import React, { FC, useEffect, useRef } from "react";

import Logo from "components/common/Logo";
import * as S from "./style";

const Header: FC = () => {
  const didMountRef = useRef(false);

  return (
    <S.Wrapper>
      <div>
        <Logo />
        <S.LoginButton>관리자 로그인</S.LoginButton>
      </div>
    </S.Wrapper>
  );
};

export default Header;
