import React, { FC, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useModalRedux } from "container/modal";
import * as S from "./style";

const Actions: FC = () => {
  const { push } = useHistory();
  const {
    modalReducer: { handleReportModal },
  } = useModalRedux();

  const pushLocation = useCallback(
    (location: string) => {
      push(`/${location}?page=1`);
    },
    [push]
  );

  return (
    <div>
      <S.Actions>
        <button onClick={() => pushLocation("notice")} className="left">
          공지사항
        </button>
        <button onClick={() => pushLocation("default")} className="white">
          대나무숲
        </button>
        <button onClick={handleReportModal} className="right">
          제보하기
        </button>
      </S.Actions>
    </div>
  );
};

export default Actions;
