import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

import * as S from "./style";
import ActionImage from "./actionImage";
import Notice from "./mainContent/Notice";
import MainContent from "./mainContent/MainContent";

const Main: FC = () => {
  const didMountRef = useRef(false);
  const { push } = useHistory();
  const { pathname } = useLocation();
  const isNotice = pathname.split("?")[0] === "/notice";

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      push("/?page=1");
    }
  }, [didMountRef]);

  return (
    <div>
      <ActionImage />
      <S.MainContent>{isNotice ? <Notice /> : <MainContent />}</S.MainContent>
    </div>
  );
};

export default Main;
