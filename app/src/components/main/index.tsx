import React, { FC, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";

import * as S from "./style";
import { useSearchRedux } from "container/search";
import { useAuthRedux } from "container/auth";
import ActionImage from "./actionImage";
import Notice from "./mainContent/Notice";
import MainContent from "./mainContent/MainContent";

const Main: FC = () => {
  const didMountRef = useRef(false);
  const { push } = useHistory();
  const { pathname } = useLocation();
  const isNotice = pathname.split("?")[0] === "/notice";
  const {
    searchReducer: { getCategoryList },
  } = useSearchRedux();
  const {
    authStore: { access_token },
  } = useAuthRedux();

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      push("/?page=1");
    }
  }, [didMountRef, push]);

  useEffect(() => {
    if (access_token !== "") {
      getCategoryList({ accessToken: access_token });
    }
  }, [access_token, getCategoryList]);

  return (
    <div>
      <ActionImage />
      <S.MainContent>{isNotice ? <Notice /> : <MainContent />}</S.MainContent>
    </div>
  );
};

export default Main;
