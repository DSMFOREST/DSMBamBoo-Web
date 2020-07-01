import {
  ApiPayload,
  NoticeItem,
  PagenationRequestType,
  PagenationType,
  TokenWithType,
} from "data/middleware/api/apiTypes";

export const GET_NOTICE_LIST = "GET_NOTICE_LIST" as const;
export const GET_NOTICE_LIST_ASYNC = "GET_NOTICE_LIST_ASYNC" as const;
export const RESET_STATUS = "RESET_STATUS" as const;

export type getNoticeListType =
  | typeof GET_NOTICE_LIST
  | typeof GET_NOTICE_LIST_ASYNC;
export type getNoticeListPayload = ApiPayload<PagenationType<NoticeItem>> &
  TokenWithType<PagenationRequestType>;
export interface GetNoticeList {
  type: getNoticeListType;
  payload: getNoticeListPayload;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type NoticeActions = GetNoticeList | ResetStatus;

export const getNoticeListAction = (
  payload: TokenWithType<PagenationRequestType>
): NoticeActions => ({
  type: GET_NOTICE_LIST,
  payload,
});

export const resetStatusAction = (): NoticeActions => ({
  type: RESET_STATUS,
});
