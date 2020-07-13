import {
  GET_COMMUNITY_RULES_ASYNC,
  GET_STUDENT_QUESTION_ASYNC,
  SUBMIT_STUDENT_ANSWER_ASYNC,
  RESET_STATUS,
  CommunityActions,
} from "data/actions/community";
import { StudentQuestion } from "data/middleware/api/apiTypes";
import { API_STATUS } from "data/middleware/api";
import { returnApiResponseData } from "..";

export type InitialState = {
  getCommunityRulesStatus: number;
  getStudentQuestionStatus: number;
  submitStudentAnswerStatus: number;
  studentQuestion: StudentQuestion;
  rules: string[];
  document_key: string;
};

const initialState: InitialState = {
  getCommunityRulesStatus: 0,
  getStudentQuestionStatus: 0,
  submitStudentAnswerStatus: 0,
  studentQuestion: {
    id: 0,
    question: "",
  },
  rules: [],
  document_key: "",
};

const communityReducer = (
  state = initialState,
  action: CommunityActions
): InitialState => {
  switch (action.type) {
    case GET_COMMUNITY_RULES_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getCommunityRulesStatus,
        payload: action.payload,
      });
    case GET_STUDENT_QUESTION_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getStudentQuestionStatus,
        payload: action.payload,
        dataKeyName: "studentQuestion",
        isOnlyData: true,
      });
    case SUBMIT_STUDENT_ANSWER_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.submitStudentAnswerStatus,
        payload: action.payload,
      });
    case RESET_STATUS:
      return {
        ...state,
        getCommunityRulesStatus: 0,
        getStudentQuestionStatus: 0,
        submitStudentAnswerStatus: 0,
      };
    default:
      return state;
  }
};

export default communityReducer;
