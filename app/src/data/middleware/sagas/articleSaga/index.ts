import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_ARTICLE_LIST,
  GET_ARTICLE_LIST_ASYNC,
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_ASYNC,
  getArticleListType,
  getArticleListPayload,
  getArticleDetailType,
  getArticleDetailPayload,
  GetArticleList,
  GetArticleDetail,
} from "data/actions/article";
import { getArticleListApi, getArticleDetailApi } from "data/middleware/api";
import { sagaEntity } from "data/middleware/sagas";

function* getArticleList(action: GetArticleList) {
  yield sagaEntity<getArticleListType, getArticleListPayload>({
    action,
    api: getArticleListApi,
    type: GET_ARTICLE_LIST_ASYNC,
  });
}

function* getArticleDetail(action: GetArticleDetail) {
  yield sagaEntity<getArticleDetailType, getArticleDetailPayload>({
    action,
    api: getArticleDetailApi,
    type: GET_ARTICLE_DETAIL_ASYNC,
  });
}

function* watchGetArticleList() {
  yield takeLatest(GET_ARTICLE_LIST, getArticleList);
}
function* watchGetArticleDetail() {
  yield takeLatest(GET_ARTICLE_DETAIL, getArticleDetail);
}

export default function* articleSaga() {
  yield all([fork(watchGetArticleList), fork(watchGetArticleDetail)]);
}
