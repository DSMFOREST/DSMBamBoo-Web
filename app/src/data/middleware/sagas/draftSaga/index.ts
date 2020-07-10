import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_DRAFT_LIST,
  GET_DRAFT_LIST_ASYNC,
  GET_DRAFT_DETAIL,
  GET_DRAFT_DETAIL_ASYNC,
  getDraftListType,
  getDraftListPayload,
  getDraftDetailType,
  getDraftDetailPayload,
  GetDraftList,
  GetDraftDetail,
} from "data/actions/draft";
import { getDraftListApi, getDraftDetailApi } from "data/middleware/api";
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

function* watchGetDraftList() {
  yield takeLatest(GET_DRAFT_LIST, getDraftList);
}
function* watchGetDraftDetail() {
  yield takeLatest(GET_DRAFT_DETAIL, getDraftDetail);
}

export default function* draftSaga() {
  yield all([fork(watchGetDraftList), fork(watchGetDraftDetail)]);
}
