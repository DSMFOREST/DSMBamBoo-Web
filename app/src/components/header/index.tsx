import React, { FC, useCallback } from "react";

import { useAuthRedux } from "container/auth";
import { useModalRedux } from "container/modal";
import Logo from "components/common/Logo";
import { decodingToToken } from "utils/convert";
import { getDeviceToken } from "utils/stroage";
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
        <S.HomeButton to="/default?page=1">
          <Logo />
        </S.HomeButton>
        <S.LoginButton
          onClick={
            decodingToToken<DecodingToken>(access_token)?.roles[0] ===
              "ROLE_ADMIN" && access_token
              ? logoutAlert
              : handleLoginModal
          }
        >
          {decodingToToken<DecodingToken>(access_token)?.roles[0] ===
            "ROLE_ADMIN" && access_token
            ? "로그아웃"
            : "관리자 로그인"}
        </S.LoginButton>
      </div>
    </S.Wrapper>
  );
};

export default Header;
