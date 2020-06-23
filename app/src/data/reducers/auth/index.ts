import {
  ADMIN_LOGIN_ASYNC,
  USER_LOGIN_ASYNC,
  RESET_STATUS,
  AuthActions,
} from "data/actions/auth";
import { AuthorizationTokens } from "data/middleware/api/apiTypes";
import { API_STATUS } from "data/middleware/api";
import { returnApiResponseData } from "..";

export type InitialState = {
  adminLoginStatus: number;
  userLoginStatus: number;
} & AuthorizationTokens;

const initialState: InitialState = {
  adminLoginStatus: 0,
  userLoginStatus: 0,
  access_token: "",
  refresh_token: "",
};

const authReducer = (
  state = initialState,
  action: AuthActions
): InitialState => {
  switch (action.type) {
    case ADMIN_LOGIN_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.adminLoginStatus,
        payload: action.payload,
      });
    case USER_LOGIN_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.userLoginStatus,
        payload: action.payload,
      });
    case RESET_STATUS:
      return {
        ...state,
        adminLoginStatus: 0,
        userLoginStatus: 0,
      };
    default:
      return state;
  }
};

export default authReducer;
