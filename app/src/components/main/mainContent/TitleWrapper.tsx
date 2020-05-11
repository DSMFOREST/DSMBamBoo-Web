import React, { FC } from "react";

import * as S from "./style";

interface OwnProps {
  title: string;
}

const TitleWrapper: FC<OwnProps> = ({ title }) => {
  return (
    <S.TitleWrapper>
      <p className="title">{title}</p>
      <S.Ellipse />
      <p className="content">대나무숲에 이야기를 제보해주세요.</p>
      <p className="content">사용전 공지사항을 꼭 읽고제보해주세요.</p>
      <S.Arrow />
    </S.TitleWrapper>
  );
};

export default TitleWrapper;
