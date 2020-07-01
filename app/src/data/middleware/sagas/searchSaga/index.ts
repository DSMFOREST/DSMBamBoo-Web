import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_LIST_ASYNC,
  getCategoryListType,
  getCategoryListPayload,
  GetCategoryList,
} from "data/actions/search";
import { getCategoryListApi } from "data/middleware/api";
import { sagaEntity } from "data/middleware/sagas";

function* getCategoryList(action: GetCategoryList) {
  yield sagaEntity<getCategoryListType, getCategoryListPayload>({
    action,
    api: getCategoryListApi,
    type: GET_CATEGORY_LIST_ASYNC,
  });
}

function* watchGetCategoryList() {
  yield takeLatest(GET_CATEGORY_LIST, getCategoryList);
}

export default function* searchSaga() {
  yield all([fork(watchGetCategoryList)]);
}
