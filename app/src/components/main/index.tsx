import React, { FC, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import * as S from "./style";
import { useSearchRedux } from "container/search";
import { useAuthRedux } from "container/auth";
import ActionImage from "./actionImage";
import Privacy from "../common/policy/Privacy";
import Notice from "./mainContent/Notice";
import MainContent from "./mainContent/MainContent";

const ReturnComponent: FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "notice":
      return <Notice />;
    case "default":
      return <MainContent />;
    case "policy":
      return <Privacy />;
    default:
      return <></>;
  }
};

const Main: FC = () => {
  const didMountRef = useRef(false);
  const { type } = useParams();
  const { push } = useHistory();
  const {
    searchReducer: { getCategoryList },
  } = useSearchRedux();
  const {
    authStore: { access_token },
  } = useAuthRedux();

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!type) {
        push("/default?page=1");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didMountRef]);

  useEffect(() => {
    if (access_token !== "") {
      getCategoryList({ accessToken: access_token });
    }
  }, [access_token, getCategoryList]);

  return (
    <div>
      <ActionImage />
      <S.MainContent>
        <ReturnComponent type={type} />
      </S.MainContent>
    </div>
  );
};

export default Main;
