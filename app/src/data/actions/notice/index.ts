import {
  ApiPayload,
  NoticeItem,
  PagenationRequestType,
  PagenationType,
  NoticeDetailRequestType,
  TokenWithType,
} from "data/middleware/api/apiTypes";

export const GET_NOTICE_LIST = "GET_NOTICE_LIST" as const;
export const GET_NOTICE_LIST_ASYNC = "GET_NOTICE_LIST_ASYNC" as const;
export const GET_NOTICE_DETAIL = "GET_NOTICE_DETAIL" as const;
export const GET_NOTICE_DETAIL_ASYNC = "GET_NOTICE_DETAIL_ASYNC" as const;
export const RESET_STATUS = "RESET_STATUS" as const;

export type getNoticeListType =
  | typeof GET_NOTICE_LIST
  | typeof GET_NOTICE_LIST_ASYNC;
export type getNoticeListPayload = ApiPayload<PagenationType<NoticeItem[]>> &
  TokenWithType<PagenationRequestType>;
export interface GetNoticeList {
  type: getNoticeListType;
  payload: getNoticeListPayload;
}

export type getNoticeDetailType =
  | typeof GET_NOTICE_DETAIL
  | typeof GET_NOTICE_DETAIL_ASYNC;
export type getNoticeDetailPayload = ApiPayload<NoticeItem> &
  TokenWithType<NoticeDetailRequestType>;
export interface GetNoticeDetail {
  type: getNoticeDetailType;
  payload: getNoticeDetailPayload;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type NoticeActions = GetNoticeList | GetNoticeDetail | ResetStatus;

export const getNoticeListAction = (
  payload: TokenWithType<PagenationRequestType>
): NoticeActions => ({
  type: GET_NOTICE_LIST,
  payload,
});

export const getNoticeDetailAction = (
  payload: TokenWithType<NoticeDetailRequestType>
): NoticeActions => ({
  type: GET_NOTICE_DETAIL,
  payload,
});

export const resetStatusAction = (): NoticeActions => ({
  type: RESET_STATUS,
});
