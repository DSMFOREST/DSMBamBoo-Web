import {
  ApiPayload,
  NoticeItem,
  DraftApprove,
  PagenationRequestType,
  PagenationType,
  NoticeDetailRequestType,
  TokenWithType,
} from "data/middleware/api/apiTypes";

export const GET_DRAFT_LIST = "GET_DRAFT_LIST" as const;
export const GET_DRAFT_LIST_ASYNC = "GET_DRAFT_LIST_ASYNC" as const;
export const GET_DRAFT_DETAIL = "GET_DRAFT_DETAIL" as const;
export const GET_DRAFT_DETAIL_ASYNC = "GET_DRAFT_DETAIL_ASYNC" as const;
export const APPROVE_DRAFT = "APPROVE_DRAFT" as const;
export const APPROVE_DRAFT_ASYNC = "APPROVE_DRAFT_ASYNC" as const;
export const REJECT_DRAFT = "REJECT_DRAFT" as const;
export const REJECT_DRAFT_ASYNC = "REJECT_DRAFT_ASYNC" as const;
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

export type approveDraftType =
  | typeof APPROVE_DRAFT
  | typeof APPROVE_DRAFT_ASYNC;
export type approveDraftPayload = ApiPayload & TokenWithType<DraftApprove>;
export interface ApproveDraft {
  type: approveDraftType;
  payload: approveDraftPayload;
}

export type rejectDraftType = typeof REJECT_DRAFT | typeof REJECT_DRAFT_ASYNC;
export type rejectDraftPayload = ApiPayload & TokenWithType<DraftApprove>;
export interface RejectDraft {
  type: rejectDraftType;
  payload: rejectDraftPayload;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type DraftActions =
  | GetDraftList
  | GetDraftDetail
  | ApproveDraft
  | RejectDraft
  | ResetStatus;

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

export const approveDraftAction = (
  payload: TokenWithType<DraftApprove>
): DraftActions => ({
  type: APPROVE_DRAFT,
  payload,
});

export const rejectDraftAction = (
  payload: TokenWithType<DraftApprove>
): DraftActions => ({
  type: REJECT_DRAFT,
  payload,
});

export const resetStatusAction = (): DraftActions => ({
  type: RESET_STATUS,
});
