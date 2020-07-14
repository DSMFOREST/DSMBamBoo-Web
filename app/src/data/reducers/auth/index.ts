import {
  ADMIN_LOGIN_ASYNC,
  USER_LOGIN_ASYNC,
  REFRESH_AUTHORIZATION_TOKEN_ASYNC,
  REFRESH_DEVICE_TOKEN_ASYNC,
  SET_AUTHORIZATION_TOKENS,
  SET_IS_ADMIN,
  RESET_STATUS,
  AuthActions,
} from "data/actions/auth";
import {
  AuthorizationTokens,
  DecodingToken,
} from "data/middleware/api/apiTypes";
import { API_STATUS } from "data/middleware/api";
import { returnApiResponseData } from "..";
import { decodingToToken } from "utils/convert";
import {
  getTokenToStorage,
  setTokenToStorage,
  setAdminRefreshToken,
  clearStorage,
} from "utils/stroage";

export type InitialState = {
  adminLoginStatus: number;
  userLoginStatus: number;
  refreshDeviceTokenStatus: number;
  refreshAuthorizationTokenStatus: number;
  isAdmin: boolean;
} & AuthorizationTokens;

const initialState: InitialState = {
  adminLoginStatus: 0,
  userLoginStatus: 0,
  refreshDeviceTokenStatus: 0,
  refreshAuthorizationTokenStatus: 0,
  access_token: "",
  refresh_token: "",
  isAdmin: false,
};

const authReducer = (
  state = initialState,
  action: AuthActions
): InitialState => {
  switch (action.type) {
    case ADMIN_LOGIN_ASYNC: {
      const newAccessToken = action.payload.data?.access_token;
      const newRefreshToken = action.payload.data?.refresh_token;
      setTokenToStorage("accessToken", newAccessToken);
      setTokenToStorage("refreshToken", newRefreshToken);

      if (
        newAccessToken &&
        decodingToToken<DecodingToken>(newAccessToken).roles[0] === "ROLE_ADMIN"
      ) {
        setAdminRefreshToken(newRefreshToken ?? "");
      }
      const adminState = {
        ...state,
        isAdmin: action.payload.status === 200 ? true : false,
      };
      return returnApiResponseData<InitialState>({
        state: adminState,
        statusName: API_STATUS.adminLoginStatus,
        payload: action.payload,
      });
    }
    case USER_LOGIN_ASYNC: {
      const newAccessToken = action.payload.data?.access_token;
      const newRefreshToken = action.payload.data?.refresh_token;
      if (
        decodingToToken<DecodingToken>(getTokenToStorage("accessToken"))
          ?.roles[0] === "ROLE_ADMIN"
      ) {
        return state;
      }

      setTokenToStorage("accessToken", newAccessToken);
      setTokenToStorage("refreshToken", newRefreshToken);
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.userLoginStatus,
        payload: action.payload,
      });
    }
    case REFRESH_AUTHORIZATION_TOKEN_ASYNC: {
      if (action.payload.status === 200) {
        const newAccessToken = action.payload.data?.access_token;
        const newRefreshToken = action.payload.data?.refresh_token;

        setTokenToStorage("accessToken", newAccessToken);
        setTokenToStorage("refreshToken", newRefreshToken);

        if (
          newAccessToken &&
          decodingToToken<DecodingToken>(newAccessToken).roles[0] ===
            "ROLE_ADMIN"
        ) {
          setAdminRefreshToken(newRefreshToken ?? "");
        }
      } else {
        clearStorage();
      }

      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.refreshAuthorizationTokenStatus,
        payload: action.payload,
      });
    }
    case REFRESH_DEVICE_TOKEN_ASYNC:
      return decodingToToken<DecodingToken>(getTokenToStorage("accessToken"))
        ?.roles[0] === "ROLE_ADMIN"
        ? state
        : returnApiResponseData<InitialState>({
            state,
            statusName: API_STATUS.refreshDeviceTokenStatus,
            payload: action.payload,
          });
    case SET_AUTHORIZATION_TOKENS:
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      };
    case SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case RESET_STATUS:
      return {
        ...state,
        adminLoginStatus: 0,
        userLoginStatus: 0,
        refreshDeviceTokenStatus: 0,
        refreshAuthorizationTokenStatus: 0,
      };
    default:
      return state;
  }
};

export default authReducer;
