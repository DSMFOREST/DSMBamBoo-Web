import {
  ApiPayload,
  NoticeItem,
  PagenationRequestType,
  PagenationType,
  NoticeDetailRequestType,
  TokenWithType,
} from "data/middleware/api/apiTypes";

export const GET_DRAFT_LIST = "GET_DRAFT_LIST" as const;
export const GET_DRAFT_LIST_ASYNC = "GET_DRAFT_LIST_ASYNC" as const;
export const GET_DRAFT_DETAIL = "GET_DRAFT_DETAIL" as const;
export const GET_DRAFT_DETAIL_ASYNC = "GET_DRAFT_DETAIL_ASYNC" as const;
export const RESET_STATUS = "RESET_STATUS" as const;

export type getDraftListType =
  | typeof GET_DRAFT_LIST
  | typeof GET_DRAFT_LIST_ASYNC;
export type getDraftListPayload = ApiPayload<PagenationType<NoticeItem[]>> &
  TokenWithType<PagenationRequestType>;
export interface GetDraftList {
  type: getDraftListType;
  payload: getDraftListPayload;
}

export type getDraftDetailType =
  | typeof GET_DRAFT_DETAIL
  | typeof GET_DRAFT_DETAIL_ASYNC;
export type getDraftDetailPayload = ApiPayload<NoticeItem> &
  TokenWithType<NoticeDetailRequestType>;
export interface GetDraftDetail {
  type: getDraftDetailType;
  payload: getDraftDetailPayload;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type DraftActions = GetDraftList | GetDraftDetail | ResetStatus;

export const getDraftListAction = (
  payload: TokenWithType<PagenationRequestType>
): DraftActions => ({
  type: GET_DRAFT_LIST,
  payload,
});

export const getDraftDetailAction = (
  payload: TokenWithType<NoticeDetailRequestType>
): DraftActions => ({
  type: GET_DRAFT_DETAIL,
  payload,
});

export const resetStatusAction = (): DraftActions => ({
  type: RESET_STATUS,
});
