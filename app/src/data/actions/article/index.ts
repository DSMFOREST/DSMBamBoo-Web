import {
  ApiPayload,
  NoticeItem,
  PagenationRequestType,
  PagenationType,
  NoticeDetailRequestType,
  TokenWithType,
} from "data/middleware/api/apiTypes";

export const GET_ARTICLE_LIST = "GET_ARTICLE_LIST" as const;
export const GET_ARTICLE_LIST_ASYNC = "GET_ARTICLE_LIST_ASYNC" as const;
export const GET_ARTICLE_DETAIL = "GET_ARTICLE_DETAIL" as const;
export const GET_ARTICLE_DETAIL_ASYNC = "GET_ARTICLE_DETAIL_ASYNC" as const;
export const RESET_STATUS = "RESET_STATUS" as const;

export type getArticleListType =
  | typeof GET_ARTICLE_LIST
  | typeof GET_ARTICLE_LIST_ASYNC;
export type getArticleListPayload = ApiPayload<PagenationType<NoticeItem[]>> &
  TokenWithType<PagenationRequestType>;
export interface GetArticleList {
  type: getArticleListType;
  payload: getArticleListPayload;
}

export type getArticleDetailType =
  | typeof GET_ARTICLE_DETAIL
  | typeof GET_ARTICLE_DETAIL_ASYNC;
export type getArticleDetailPayload = ApiPayload<NoticeItem> &
  TokenWithType<NoticeDetailRequestType>;
export interface GetArticleDetail {
  type: getArticleDetailType;
  payload: getArticleDetailPayload;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type ArticleActions = GetArticleList | GetArticleDetail | ResetStatus;

export const getArticleListAction = (
  payload: TokenWithType<PagenationRequestType>
): ArticleActions => ({
  type: GET_ARTICLE_LIST,
  payload,
});

export const getArticleDetailAction = (
  payload: TokenWithType<NoticeDetailRequestType>
): ArticleActions => ({
  type: GET_ARTICLE_DETAIL,
  payload,
});

export const resetStatusAction = (): ArticleActions => ({
  type: RESET_STATUS,
});
