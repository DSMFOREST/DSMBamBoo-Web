import React, { FC } from "react";

import * as S from "./style";

interface OwnProps {
  rules: string[];
}

const NoticeContent: FC<OwnProps> = ({ rules }) => {
  return (
    <S.NoticeContent>
      <div>
        {rules.map((v) => (
          <S.TextForm key={v}>{v}</S.TextForm>
        ))}
      </div>
      <div>
        <S.TextForm>
          <span className="strong">Quiz</span>
        </S.TextForm>
        <S.TextForm>
          <span className="bold">Q.</span> 기숙사에서 노트북을 제출해야하는
          시간은?
        </S.TextForm>
        <S.AnswerLabel>
          <span className="bold">A.</span>
          <input placeholder="답을 입력해주세요" type="text" />
          <span className="warning">틀렸습니다.</span>
        </S.AnswerLabel>
      </div>
    </S.NoticeContent>
  );
};

export default NoticeContent;
