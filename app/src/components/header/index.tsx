import React, { FC, useCallback } from "react";

import { useAuthRedux } from "container/auth";
import { useModalRedux } from "container/modal";
import Logo from "components/common/Logo";
import { decodingToToken } from "utils/convert";
import { getDeviceToken, getAdminRefreshToken } from "utils/stroage";
import { DecodingToken } from "data/middleware/api/apiTypes";
import * as S from "./style";

const Header: FC = () => {
  const {
    modalReducer: { handleLoginModal },
  } = useModalRedux();
  const {
    authStore: { access_token },
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
        <Logo />
        <S.LoginButton
          onClick={
            decodingToToken<DecodingToken>(access_token)?.roles[0] ===
              "ROLE_ADMIN" && access_token
              ? logoutAlert
              : handleLoginModal
          }
        >
          {getAdminRefreshToken() ? "로그아웃" : "관리자 로그인"}
        </S.LoginButton>
      </div>
    </S.Wrapper>
  );
};

export default Header;
