import {
  TransformImages,
  ImageUploadRequestType,
  NoticeItem,
  TokenWithType,
  ApiPayload,
  PostNoticeRequestType,
} from "data/middleware/api/apiTypes";

export const IMAGES_UPLOAD = "IMAGES_UPLOAD" as const;
export const IMAGES_UPLOAD_ASYNC = "IMAGES_UPLOAD_ASYNC" as const;
export const POST_NOTICE = "POST_NOTICE" as const;
export const POST_NOTICE_ASYNC = "POST_NOTICE_ASYNC" as const;
export const RESET_STATUS = "RESET_STATUS" as const;

export type imagesUploadType =
  | typeof IMAGES_UPLOAD
  | typeof IMAGES_UPLOAD_ASYNC;
export type imagesUploadPayload = ApiPayload<TransformImages> &
  TokenWithType<ImageUploadRequestType>;
export interface ImageUpload {
  type: imagesUploadType;
  payload: imagesUploadPayload;
}

export type postNoticeType = typeof POST_NOTICE | typeof POST_NOTICE_ASYNC;
export type postNoticePayload = ApiPayload<NoticeItem> &
  TokenWithType<PostNoticeRequestType>;
export interface PostNotice {
  type: postNoticeType;
  payload: postNoticePayload;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type SubmitActions = ImageUpload | PostNotice | ResetStatus;

export const imagesUploadAction = (
  payload: TokenWithType<ImageUploadRequestType>
): SubmitActions => ({
  type: IMAGES_UPLOAD,
  payload,
});

export const postNoticeAction = (
  payload: TokenWithType<PostNoticeRequestType>
): SubmitActions => ({
  type: POST_NOTICE,
  payload,
});

export const resetStatusAction = (): SubmitActions => ({
  type: RESET_STATUS,
});
