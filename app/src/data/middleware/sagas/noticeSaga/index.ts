import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_NOTICE_LIST,
  GET_NOTICE_LIST_ASYNC,
  GET_NOTICE_DETAIL,
  GET_NOTICE_DETAIL_ASYNC,
  getNoticeListType,
  getNoticeListPayload,
  getNoticeDetailType,
  getNoticeDetailPayload,
  GetNoticeList,
  GetNoticeDetail,
} from "data/actions/notice";
import { getNoticeListApi, getNoticeDetailApi } from "data/middleware/api";
import { sagaEntity } from "data/middleware/sagas";

function* getNoticeList(action: GetNoticeList) {
  yield sagaEntity<getNoticeListType, getNoticeListPayload>({
    action,
    api: getNoticeListApi,
    type: GET_NOTICE_LIST_ASYNC,
  });
}

function* getNoticeDetail(action: GetNoticeDetail) {
  yield sagaEntity<getNoticeDetailType, getNoticeDetailPayload>({
    action,
    api: getNoticeDetailApi,
    type: GET_NOTICE_DETAIL_ASYNC,
  });
}

function* watchGetNoticeList() {
  yield takeLatest(GET_NOTICE_LIST, getNoticeList);
}
function* watchGetNoticeDetail() {
  yield takeLatest(GET_NOTICE_DETAIL, getNoticeDetail);
}

export default function* noticeSaga() {
  yield all([fork(watchGetNoticeList), fork(watchGetNoticeDetail)]);
}
