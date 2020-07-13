import {
  CategoryItem,
  AccessToken,
  ApiPayload,
  StudentQuestion,
  TokenWithType,
  SubmitAnswer,
  SubmitAnswerSuccess,
} from "data/middleware/api/apiTypes";

export const GET_COMMUNITY_RULES = "GET_COMMUNITY_RULES" as const;
export const GET_COMMUNITY_RULES_ASYNC = "GET_COMMUNITY_RULES_ASYNC" as const;
export const GET_STUDENT_QUESTION = "GET_STUDENT_QUESTION" as const;
export const GET_STUDENT_QUESTION_ASYNC = "GET_STUDENT_QUESTION_ASYNC" as const;
export const SUBMIT_STUDENT_ANSWER = "SUBMIT_STUDENT_ANSWER" as const;
export const SUBMIT_STUDENT_ANSWER_ASYNC = "SUBMIT_STUDENT_ANSWER_ASYNC" as const;
export const RESET_STATUS = "RESET_STATUS" as const;

export type getCommunityRulesType =
  | typeof GET_COMMUNITY_RULES
  | typeof GET_COMMUNITY_RULES_ASYNC;
export type getCommunityRulesPayload = ApiPayload<CategoryItem[]> & AccessToken;
export interface GetCommunityRules {
  type: getCommunityRulesType;
  payload: getCommunityRulesPayload;
}

export type getStudentQuestionType =
  | typeof GET_STUDENT_QUESTION
  | typeof GET_STUDENT_QUESTION_ASYNC;
export type getStudentQuestionPayload = ApiPayload<StudentQuestion> &
  AccessToken;
export interface GetStudentQuestion {
  type: getStudentQuestionType;
  payload: getStudentQuestionPayload;
}

export type submitStudentAnswerType =
  | typeof SUBMIT_STUDENT_ANSWER
  | typeof SUBMIT_STUDENT_ANSWER_ASYNC;
export type submitStudentAnswerPayload = ApiPayload<SubmitAnswerSuccess> &
  TokenWithType<SubmitAnswer>;
export interface SubmitStudentAnswer {
  type: submitStudentAnswerType;
  payload: submitStudentAnswerPayload;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type CommunityActions =
  | GetCommunityRules
  | GetStudentQuestion
  | SubmitStudentAnswer
  | ResetStatus;

export const getCommunityRulesAction = (
  payload: AccessToken
): CommunityActions => ({
  type: GET_COMMUNITY_RULES,
  payload,
});

export const getStudentQuestionAction = (
  payload: AccessToken
): CommunityActions => ({
  type: GET_STUDENT_QUESTION,
  payload,
});

export const submitStudentAnswerAction = (
  payload: TokenWithType<SubmitAnswer>
): CommunityActions => ({
  type: SUBMIT_STUDENT_ANSWER,
  payload,
});

export const resetStatusAction = (): CommunityActions => ({
  type: RESET_STATUS,
});
