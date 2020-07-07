import { fork, takeLatest, all } from "redux-saga/effects";

import {
  IMAGES_UPLOAD,
  IMAGES_UPLOAD_ASYNC,
  POST_NOTICE,
  POST_NOTICE_ASYNC,
  imagesUploadType,
  imagesUploadPayload,
  postNoticeType,
  postNoticePayload,
  ImageUpload,
  PostNotice,
} from "data/actions/submit";
import { imageUploadApi, postNoticeApi } from "data/middleware/api";
import { sagaEntity } from "data/middleware/sagas";

function* imagesUpload(action: ImageUpload) {
  yield sagaEntity<imagesUploadType, imagesUploadPayload>({
    action,
    api: imageUploadApi,
    type: IMAGES_UPLOAD_ASYNC,
  });
}

function* postNotice(action: PostNotice) {
  yield sagaEntity<postNoticeType, postNoticePayload>({
    action,
    api: postNoticeApi,
    type: POST_NOTICE_ASYNC,
  });
}

function* watchImagesUpload() {
  yield takeLatest(IMAGES_UPLOAD, imagesUpload);
}

function* watchPostNotice() {
  yield takeLatest(POST_NOTICE, postNotice);
}

export default function* submitSaga() {
  yield all([fork(watchImagesUpload), fork(watchPostNotice)]);
}
