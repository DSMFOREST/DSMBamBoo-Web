import {
  GET_COMMUNITY_RULES_ASYNC,
  RESET_STATUS,
  CommunityActions,
} from "data/actions/community";
import { API_STATUS } from "data/middleware/api";
import { returnApiResponseData } from "..";

export type InitialState = {
  getCommunityRulesStatus: number;
  rules: string[];
};

const initialState: InitialState = {
  getCommunityRulesStatus: 0,
  rules: [],
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
    case RESET_STATUS:
      return {
        ...state,
        getCommunityRulesStatus: 0,
      };
    default:
      return state;
  }
};

export default communityReducer;
