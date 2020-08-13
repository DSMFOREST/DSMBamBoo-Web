import React, { FC, useCallback } from "react";

import { useAuthRedux } from "container/auth";
import { useModalRedux } from "container/modal";
import Logo from "components/common/Logo";
import { getDeviceToken, getAdminRefreshToken } from "utils/stroage";
import * as S from "./style";

const Header: FC = () => {
  const {
    modalReducer: { handleLoginModal },
  } = useModalRedux();
  const {
    authReducer: { logout, userLogin },
  } = useAuthRedux();

  const logoutAlert = useCallback(() => {
    logout();
    alert("로그아웃 되었습니다.");
    userLogin({ device_token: getDeviceToken() ?? "" });
  }, [logout, userLogin]);

  return (
    <S.Wrapper>
      <div>
        <S.HomeButton to="/default?page=1">
          <Logo />
        </S.HomeButton>
        <S.LoginButton
          onClick={getAdminRefreshToken() ? logoutAlert : handleLoginModal}
        >
          {getAdminRefreshToken() ? "로그아웃" : "관리자 로그인"}
        </S.LoginButton>
      </div>
    </S.Wrapper>
  );
};

export default Header;
