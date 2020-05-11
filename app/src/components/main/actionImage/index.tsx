import React, { FC, useState, useCallback } from "react";

import Actions from "./Actions";
import * as S from "./style";

const ActionImage: FC = () => {
  return (
    <S.Wrapper>
      <section>
        <S.Title>
          <span>대마고</span> 대나무숲입니다!
        </S.Title>
        <Actions />
      </section>
    </S.Wrapper>
  );
};

export default ActionImage;
