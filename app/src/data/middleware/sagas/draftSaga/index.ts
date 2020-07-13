import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_DRAFT_LIST,
  GET_DRAFT_LIST_ASYNC,
  GET_DRAFT_DETAIL,
  GET_DRAFT_DETAIL_ASYNC,
  APPROVE_DRAFT,
  APPROVE_DRAFT_ASYNC,
  REJECT_DRAFT,
  REJECT_DRAFT_ASYNC,
  getDraftListType,
  getDraftListPayload,
  getDraftDetailType,
  getDraftDetailPayload,
  approveDraftType,
  approveDraftPayload,
  rejectDraftType,
  rejectDraftPayload,
  GetDraftList,
  GetDraftDetail,
  ApproveDraft,
  RejectDraft,
} from "data/actions/draft";
import {
  getDraftListApi,
  getDraftDetailApi,
  approveDraftApi,
  rejectDraftApi,
} from "data/middleware/api";
import { sagaEntity } from "data/middleware/sagas";

function* getDraftList(action: GetDraftList) {
  yield sagaEntity<getDraftListType, getDraftListPayload>({
    action,
    api: getDraftListApi,
    type: GET_DRAFT_LIST_ASYNC,
  });
}

function* getDraftDetail(action: GetDraftDetail) {
  yield sagaEntity<getDraftDetailType, getDraftDetailPayload>({
    action,
    api: getDraftDetailApi,
    type: GET_DRAFT_DETAIL_ASYNC,
  });
}

function* approveDraft(action: ApproveDraft) {
  yield sagaEntity<approveDraftType, approveDraftPayload>({
    action,
    api: approveDraftApi,
    type: APPROVE_DRAFT_ASYNC,
  });
}

function* rejectDraft(action: RejectDraft) {
  yield sagaEntity<rejectDraftType, rejectDraftPayload>({
    action,
    api: rejectDraftApi,
    type: REJECT_DRAFT_ASYNC,
  });
}

function* watchGetDraftList() {
  yield takeLatest(GET_DRAFT_LIST, getDraftList);
}
function* watchGetDraftDetail() {
  yield takeLatest(GET_DRAFT_DETAIL, getDraftDetail);
}
function* watchApproveDraft() {
  yield takeLatest(APPROVE_DRAFT, approveDraft);
}
function* watchRejectDraft() {
  yield takeLatest(REJECT_DRAFT, rejectDraft);
}

export default function* draftSaga() {
  yield all([
    fork(watchGetDraftList),
    fork(watchGetDraftDetail),
    fork(watchApproveDraft),
    fork(watchRejectDraft),
  ]);
}
