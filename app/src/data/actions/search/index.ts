import {
  CategoryItem,
  AccessToken,
  ApiPayload,
} from "data/middleware/api/apiTypes";

export const GET_CATEGORY_LIST = "GET_CATEGORY_LIST" as const;
export const GET_CATEGORY_LIST_ASYNC = "GET_CATEGORY_LIST_ASYNC" as const;
export const RESET_STATUS = "RESET_STATUS" as const;

export type getCategoryListType =
  | typeof GET_CATEGORY_LIST
  | typeof GET_CATEGORY_LIST_ASYNC;
export type getCategoryListPayload = ApiPayload<CategoryItem[]> & AccessToken;
export interface GetCategoryList {
  type: getCategoryListType;
  payload: getCategoryListPayload;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type SearchActions = GetCategoryList | ResetStatus;

export const getCategoryListAction = (payload: AccessToken): SearchActions => ({
  type: GET_CATEGORY_LIST,
  payload,
});

export const resetStatusAction = (): SearchActions => ({
  type: RESET_STATUS,
});
