import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_LIST_ASYNC,
  getCategoryListType,
  getCategoryListPayload,
  GetCategoryList,
  POST_CATEGORY,
  POST_CATEGORY_ASYNC,
  postCategoryType,
  postCategoryPayload,
  PostCategory,
  REMOVE_CATEGORY,
  REMOVE_CATEGORY_ASYNC,
  removeCategoryType,
  removeCategoryPayload,
  RemoveCategory
} from "actions/category";
import {
  getCategoryListApi,
  postCategoryApi,
  removeCategoryApi
} from "middleware/api";
import { sagaEntity } from "middleware/sagas";

function* getCategoryList(action: GetCategoryList) {
  yield sagaEntity<getCategoryListType, getCategoryListPayload>({
    action,
    api: getCategoryListApi,
    type: GET_CATEGORY_LIST_ASYNC
  });
}

function* postCategory(action: PostCategory) {
  yield sagaEntity<postCategoryType, postCategoryPayload>({
    action,
    api: postCategoryApi,
    type: POST_CATEGORY_ASYNC
  });
}

function* removeCategory(action: RemoveCategory) {
  yield sagaEntity<removeCategoryType, removeCategoryPayload>({
    action,
    api: removeCategoryApi,
    type: REMOVE_CATEGORY_ASYNC
  });
}

function* watchGetCategoryList() {
  yield takeLatest(GET_CATEGORY_LIST, getCategoryList);
}

function* watchPostCategory() {
  yield takeLatest(POST_CATEGORY, postCategory);
}

function* watchRemoveCategory() {
  yield takeLatest(REMOVE_CATEGORY, removeCategory);
}

export default function* categorySaga() {
  yield all([
    fork(watchGetCategoryList),
    fork(watchPostCategory),
    fork(watchRemoveCategory)
  ]);
}
