import { combineReducers } from "redux";

import modal from "./modal";
import auth from "./auth";

const appReducer = combineReducers({ modal, auth });

const rootReducer = (state: any, action: any) => {
  let resetState = state;

  if (action.type === "LOG_OUT") {
    resetState = undefined;
  }

  return appReducer(resetState, action);
};

export const responseStatus = (status: number) => {
  return {
    _200: status === 200,
    _400: status === 400,
    _403: status === 403,
    _404: status === 404,
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
