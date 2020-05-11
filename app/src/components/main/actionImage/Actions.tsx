import React, { FC, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import * as S from "./style";

const Actions: FC = () => {
  const { push } = useHistory();

  const pushLocation = useCallback((location: string) => {
    push(`/${location}?page=1`);
  }, []);

  return (
    <div>
      <S.Actions>
        <button onClick={() => pushLocation("notice")} className="left">
          공지사항
        </button>
        <button onClick={() => pushLocation("")} className="white">
          대나무숲
        </button>
        <button className="right">제보하기</button>
      </S.Actions>
    </div>
  );
};

export default Actions;
