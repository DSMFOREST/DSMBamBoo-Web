import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_NOTICE_LIST,
  GET_NOTICE_LIST_ASYNC,
  getNoticeListType,
  getNoticeListPayload,
  GetNoticeList,
} from "data/actions/notice";
import { getNoticeListApi } from "data/middleware/api";
import { sagaEntity } from "data/middleware/sagas";

function* getNoticeList(action: GetNoticeList) {
  yield sagaEntity<getNoticeListType, getNoticeListPayload>({
    action,
    api: getNoticeListApi,
    type: GET_NOTICE_LIST_ASYNC,
  });
}

function* watchGetNoticeList() {
  yield takeLatest(GET_NOTICE_LIST, getNoticeList);
}

export default function* noticeSaga() {
  yield all([fork(watchGetNoticeList)]);
}
