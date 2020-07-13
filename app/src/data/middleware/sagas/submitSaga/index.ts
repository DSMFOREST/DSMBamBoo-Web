import { fork, takeLatest, all } from "redux-saga/effects";

import {
  IMAGES_UPLOAD,
  IMAGES_UPLOAD_ASYNC,
  POST_NOTICE,
  POST_NOTICE_ASYNC,
  POST_DRAFT,
  POST_DRAFT_ASYNC,
  imagesUploadType,
  imagesUploadPayload,
  postNoticeType,
  postNoticePayload,
  postDraftType,
  postDraftPayload,
  ImageUpload,
  PostNotice,
  PostDraft,
} from "data/actions/submit";
import {
  imageUploadApi,
  postNoticeApi,
  postDraftApi,
} from "data/middleware/api";
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

function* postDraft(action: PostDraft) {
  yield sagaEntity<postDraftType, postDraftPayload>({
    action,
    api: postDraftApi,
    type: POST_DRAFT_ASYNC,
  });
}

function* watchImagesUpload() {
  yield takeLatest(IMAGES_UPLOAD, imagesUpload);
}

function* watchPostNotice() {
  yield takeLatest(POST_NOTICE, postNotice);
}

function* watchPostDraft() {
  yield takeLatest(POST_DRAFT, postDraft);
}

export default function* submitSaga() {
  yield all([
    fork(watchImagesUpload),
    fork(watchPostNotice),
    fork(watchPostDraft),
  ]);
}
