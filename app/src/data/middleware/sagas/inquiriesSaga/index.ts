import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_INQUIRIES_LIST,
  GET_INQUIRIES_LIST_ASYNC,
  GET_PURCHASES_LIST,
  GET_PURCHASES_LIST_ASYNC,
  getInquiriesListType,
  getInquiriesListPayload,
  getPurchasesListType,
  getPurchasesListPayload,
  GetInquiriesList,
  GetPurchasesList
} from "actions/inquiries";
import { getInquiriesListApi, getPurchasesListApi } from "middleware/api";
import { sagaEntity } from "middleware/sagas";

function* getInquiriesList(action: GetInquiriesList) {
  yield sagaEntity<getInquiriesListType, getInquiriesListPayload>({
    action,
    api: getInquiriesListApi,
    type: GET_INQUIRIES_LIST_ASYNC
  });
}

function* getPurchasesList(action: GetPurchasesList) {
  yield sagaEntity<getPurchasesListType, getPurchasesListPayload>({
    action,
    api: getPurchasesListApi,
    type: GET_PURCHASES_LIST_ASYNC
  });
}

function* watchGetInquiriesList() {
  yield takeLatest(GET_INQUIRIES_LIST, getInquiriesList);
}

function* watchGetPurchasesList() {
  yield takeLatest(GET_PURCHASES_LIST, getPurchasesList);
}

export default function* inquiriesSaga() {
  yield all([fork(watchGetInquiriesList), fork(watchGetPurchasesList)]);
}
