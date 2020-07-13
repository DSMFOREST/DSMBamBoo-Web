import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCommunityRulesAction,
  getStudentQuestionAction,
  submitStudentAnswerAction,
  resetStatusAction,
} from "data/actions/community";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/community";
import {
  AccessToken,
  SubmitAnswer,
  TokenWithType,
} from "data/middleware/api/apiTypes";

export const useCommunityRedux = () => {
  const dispatch = useDispatch();
  const communityStore = useSelector<AppState, InitialState>((state) => ({
    document_key: state.community.document_key,
    rules: state.community.rules,
    studentQuestion: state.community.studentQuestion,
    getCommunityRulesStatus: state.community.getCommunityRulesStatus,
    getStudentQuestionStatus: state.community.getStudentQuestionStatus,
    submitStudentAnswerStatus: state.community.submitStudentAnswerStatus,
  }));

  const getCommunityRules = useCallback(
    (payload: AccessToken) => {
      dispatch(getCommunityRulesAction(payload));
    },
    [dispatch]
  );

  const getStudentQuestion = useCallback(
    (payload: AccessToken) => {
      dispatch(getStudentQuestionAction(payload));
    },
    [dispatch]
  );

  const submitStudentAnswer = useCallback(
    (payload: TokenWithType<SubmitAnswer>) => {
      dispatch(submitStudentAnswerAction(payload));
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const communityReducer = {
    getCommunityRules,
    getStudentQuestion,
    submitStudentAnswer,
    resetStatus,
  };

  return { communityStore, communityReducer };
};
