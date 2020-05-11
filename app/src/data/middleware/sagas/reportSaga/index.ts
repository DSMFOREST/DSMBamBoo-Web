import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_REPORT_LIST,
  GET_REPORT_LIST_ASYNC,
  getReportListType,
  getReportListPayload,
  GetReportList
} from "actions/report";
import { getReportListApi } from "middleware/api";
import { sagaEntity } from "middleware/sagas";

function* getReportList(action: GetReportList) {
  yield sagaEntity<getReportListType, getReportListPayload>({
    action,
    api: getReportListApi,
    type: GET_REPORT_LIST_ASYNC
  });
}

function* watchGetReportList() {
  yield takeLatest(GET_REPORT_LIST, getReportList);
}

export default function* reportSaga() {
  yield all([fork(watchGetReportList)]);
}
