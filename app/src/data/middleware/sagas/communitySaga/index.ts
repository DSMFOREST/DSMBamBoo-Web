import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_COMMUNITY_RULES,
  GET_COMMUNITY_RULES_ASYNC,
  GET_STUDENT_QUESTION,
  GET_STUDENT_QUESTION_ASYNC,
  SUBMIT_STUDENT_ANSWER,
  SUBMIT_STUDENT_ANSWER_ASYNC,
  getCommunityRulesType,
  getStudentQuestionType,
  submitStudentAnswerType,
  getCommunityRulesPayload,
  getStudentQuestionPayload,
  submitStudentAnswerPayload,
  GetCommunityRules,
  GetStudentQuestion,
  SubmitStudentAnswer,
} from "data/actions/community";
import {
  getCommunityRulesApi,
  getStudentQuestionApi,
  submitStudentAnswerApi,
} from "data/middleware/api";
import { sagaEntity } from "data/middleware/sagas";

function* getCommunityRules(action: GetCommunityRules) {
  yield sagaEntity<getCommunityRulesType, getCommunityRulesPayload>({
    action,
    api: getCommunityRulesApi,
    type: GET_COMMUNITY_RULES_ASYNC,
  });
}

function* getStudentQuestion(action: GetStudentQuestion) {
  yield sagaEntity<getStudentQuestionType, getStudentQuestionPayload>({
    action,
    api: getStudentQuestionApi,
    type: GET_STUDENT_QUESTION_ASYNC,
  });
}

function* submitStudentAnswer(action: SubmitStudentAnswer) {
  yield sagaEntity<submitStudentAnswerType, submitStudentAnswerPayload>({
    action,
    api: submitStudentAnswerApi,
    type: SUBMIT_STUDENT_ANSWER_ASYNC,
  });
}

function* watchGetCommunityRules() {
  yield takeLatest(GET_COMMUNITY_RULES, getCommunityRules);
}

function* watchGetStudentQuestion() {
  yield takeLatest(GET_STUDENT_QUESTION, getStudentQuestion);
}

function* watchSubmitStudentAnswer() {
  yield takeLatest(SUBMIT_STUDENT_ANSWER, submitStudentAnswer);
}

export default function* communitySaga() {
  yield all([
    fork(watchGetCommunityRules),
    fork(watchGetStudentQuestion),
    fork(watchSubmitStudentAnswer),
  ]);
}
