import React, { FC, useState, useCallback, useEffect } from "react";

import { LoadingImg } from "assets";
import { useAuthRedux } from "container/auth";
import { useCommunityRedux } from "container/community";
import { responseStatus } from "data/reducers";
import * as S from "./style";

interface OwnProps {
  isLoading: boolean;
  isStudent: boolean;
}

const NoticeContent: FC<OwnProps> = ({ isLoading, isStudent }) => {
  const {
    authStore: { access_token },
  } = useAuthRedux();
  const {
    communityStore: { rules, studentQuestion, submitStudentAnswerStatus },
    communityReducer: { submitStudentAnswer, resetStatus },
  } = useCommunityRedux();

  const [isFailed, setIsFailed] = useState(false);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleAnswer = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setAnswer(value);
    },
    []
  );

  const onPressEnter = useCallback(
    ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === "Enter") {
        setIsQuestionLoading(true);
        submitStudentAnswer({
          accessToken: access_token,
          questionId: studentQuestion.id,
          answer,
        });
      }
    },
    [access_token, answer, studentQuestion.id, submitStudentAnswer]
  );

  useEffect(() => {
    const { _403, _200 } = responseStatus(submitStudentAnswerStatus);

    if (_200) {
      setIsQuestionLoading(false);
    } else if (_403) {
      setIsQuestionLoading(false);
      setIsFailed(true);
    }

    resetStatus();
  }, [resetStatus, submitStudentAnswerStatus]);

  return (
    <S.NoticeContent>
      <div>
        {isLoading ? (
          <S.Loading>
            <img src={LoadingImg} alt="로딩즁.." />
          </S.Loading>
        ) : (
          rules.map((v) => <S.TextForm key={v}>{v}</S.TextForm>)
        )}
      </div>
      <div>
        <S.TextForm>
          <span className="strong">Quiz</span>
        </S.TextForm>
        {isLoading ? (
          <S.Loading>
            <img src={LoadingImg} alt="로딩즁.." />
          </S.Loading>
        ) : (
          <S.TextForm>
            <span className="bold">Q.</span> {studentQuestion.question}
          </S.TextForm>
        )}
        <S.AnswerLabel>
          <span className="bold">A.</span>
          <input
            disabled={isStudent}
            value={answer}
            onChange={handleAnswer}
            onKeyPress={onPressEnter}
            placeholder={isStudent ? "정답입니다!" : "답을 입력해주세요"}
            type="text"
          />
          {isQuestionLoading ? (
            <S.QuestionLoading>
              <img src={LoadingImg} alt="로딩즁.." />
            </S.QuestionLoading>
          ) : (
            isFailed && <span className="warning">틀렸습니다.</span>
          )}
        </S.AnswerLabel>
      </div>
    </S.NoticeContent>
  );
};

export default NoticeContent;
