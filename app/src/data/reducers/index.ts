import { combineReducers } from "redux";

import { setTokenToStorage, setAdminRefreshToken } from "utils/stroage";
import modal from "./modal";
import auth from "./auth";
import notice from "./notice";
import article from "./article";
import draft from "./draft";
import search from "./search";
import submit from "./submit";
import community from "./community";

const appReducer = combineReducers({
  modal,
  auth,
  notice,
  article,
  search,
  draft,
  submit,
  community,
});

const rootReducer = (state: any, action: any) => {
  let resetState = state;

  if (action.type === "LOG_OUT") {
    resetState = undefined;
    setTokenToStorage("accessToken", "");
    setTokenToStorage("refreshToken", "");
    setAdminRefreshToken("");
  }

  return appReducer(resetState, action);
};

export const responseStatus = (status: number) => {
  return {
    _200: status === 200,
    _201: status === 201,
    _400: status === 400,
    _401: status === 401,
    _403: status === 403,
    _404: status === 404,
    _413: status === 413,
  };
};

export const returnApiResponseData = <I>(props: {
  state: I;
  statusName: string;
  payload: {
    data?: null | any;
    status?: number;
  };
  dataKeyName?: string;
  isOnlyData?: boolean;
}): I => {
  if (props.payload.data === null) {
    return {
      ...props.state,
      [props.statusName]: props.payload.status,
    };
  }

  if (props.isOnlyData && props.dataKeyName) {
    return {
      ...props.state,
      [props.dataKeyName]: props.payload.data,
      [props.statusName]: props.payload.status,
    };
  }

  let returnObject = {};

  for (let i in props.payload.data) {
    returnObject = { ...returnObject, [i]: props.payload.data[i] };
  }

  if (props.dataKeyName) {
    return {
      ...props.state,
      [props.dataKeyName]: { ...returnObject },
      [props.statusName]: props.payload.status,
    };
  }

  return {
    ...props.state,
    ...returnObject,
    [props.statusName]: props.payload.status,
  };
};

export default rootReducer;
