import React, { FC } from "react";

import { PRIVACY } from "./presenter";
import * as S from "./style";

const Privacy: FC = () => {
  return (
    <div>
      <S.Title>
        <h1>개인정보처리방침</h1>
        <p>{PRIVACY}</p>
      </S.Title>
    </div>
  );
};

export default Privacy;
