import React, { FC } from "react";

import * as S from "./style";

const NoticeContent: FC = () => {
  return (
    <S.NoticeContent>
      <div>
        <S.TextForm>
          1. <span className="strong">규칙</span>을 꼭 읽어주세요. 규칙에
          위배되는 경우 게시글 등록이 불가능합니다.
        </S.TextForm>
        <S.TextForm>
          2. 등록된 게시글은 수정 및 삭제가 불가능하니 신중하게 글을
          작성바랍니다.
        </S.TextForm>
        <S.TextForm>
          3. 제보된 글은 관리자의 승인이 있어야 게시됩니다.
        </S.TextForm>
        <S.TextForm>
          4. 대나무숲 규칙을 확인하지 않으면 제보하기 버튼이 눌리지 않습니다.
        </S.TextForm>
        <S.TextForm>5. 대마고 대나무숲은 대마인만 제보가능 합니다.</S.TextForm>
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
