import axios from "axios";

import { baseURL } from "./currentURL";
import {
  TokenWithType,
  AccessToken,
  DeviceToken,
  RefreshToken,
  AdminLoginRequestType,
  UserLoginRequestType,
  PagenationRequestType,
  ImageUploadRequestType,
  NoticeDetailRequestType,
  PostNoticeRequestType,
  SubmitAnswer,
  PostDrafts,
  DraftApprove,
} from "./apiTypes";

export enum API_STATUS {
  adminLoginStatus = "adminLoginStatus",
  userLoginStatus = "userLoginStatus",
  getCategoryStatus = "getCategoryStatus",
  getNoticeStatus = "getNoticeStatus",
  getArticleStatus = "getArticleStatus",
  refreshDeviceTokenStatus = "refreshDeviceTokenStatus",
  refreshAuthorizationTokenStatus = "refreshAuthorizationTokenStatus",
  imagesUploadStatus = "imagesUploadStatus",
  getNoticeDetailStatus = "getNoticeDetailStatus",
  getArticleDetailStatus = "getArticleDetailStatus",
  getDraftStatus = "getDraftStatus",
  getDraftDetailStatus = "getDraftDetailStatus",
  postNoticeStatus = "postNoticeStatus",
  getCommunityRulesStatus = "getCommunityRulesStatus",
  getStudentQuestionStatus = "getStudentQuestionStatus",
  postDraftStatus = "postDraftStatus",
  submitStudentAnswerStatus = "submitStudentAnswerStatus",
  approveDraftStatus = "approveDraftStatus",
  rejectDraftStatus = "rejectDraftStatus",
}

const authorizationHeader = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

const instanceAxios = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const refreshDeviceTokenApi = async ({
  accessToken,
  ...requset
}: TokenWithType<DeviceToken>) => {
  const response = await instanceAxios.patch(
    "/users/me/device-token",
    requset,
    {
      headers: authorizationHeader(accessToken),
    }
  );

  return [response.data, response.status];
};

export const refreshAuthorizationTokenApi = async ({
  refresh_token,
}: RefreshToken) => {
  const response = await instanceAxios.patch("/auth/refresh", null, {
    headers: {
      "X-Refresh-Token": refresh_token,
    },
  });

  return [response.data, response.status];
};

export const adminLoginApi = async ({ ...requset }: AdminLoginRequestType) => {
  const response = await instanceAxios.post("/admin/auth/signin", requset);

  return [response.data, response.status];
};

export const userLoginApi = async ({ ...requset }: UserLoginRequestType) => {
  const response = await instanceAxios.post("/auth/signin", requset);

  return [response.data, response.status];
};

export const getCategoryListApi = async ({ ...requset }: AccessToken) => {
  const response = await instanceAxios.get("/categories", {
    headers: authorizationHeader(requset.accessToken),
  });

  return [response.data, response.status];
};

export const getNoticeListApi = async ({
  accessToken,
  ...requset
}: TokenWithType<PagenationRequestType>) => {
  const response = await instanceAxios.get("/notices", {
    headers: authorizationHeader(accessToken),
    params: {
      ...requset,
    },
  });

  return [response.data, response.status];
};

export const getNoticeDetailApi = async ({
  accessToken,
  ...request
}: TokenWithType<NoticeDetailRequestType>) => {
  const response = await instanceAxios.get(`/notices/${request.id}`, {
    headers: authorizationHeader(accessToken),
  });

  return [response.data, response.status];
};

export const postNoticeApi = async ({
  accessToken,
  ...requset
}: TokenWithType<PostNoticeRequestType>) => {
  const response = await instanceAxios.post("/notices", requset, {
    headers: authorizationHeader(accessToken),
  });

  return [response.data, response.status];
};

export const getArticleListApi = async ({
  accessToken,
  ...requset
}: TokenWithType<PagenationRequestType>) => {
  const response = await instanceAxios.get("/articles", {
    headers: authorizationHeader(accessToken),
    params: {
      ...requset,
    },
  });

  return [response.data, response.status];
};

export const getArticleDetailApi = async ({
  accessToken,
  ...request
}: TokenWithType<NoticeDetailRequestType>) => {
  const response = await instanceAxios.get(`/articles/${request.id}`, {
    headers: authorizationHeader(accessToken),
  });

  return [response.data, response.status];
};

export const getDraftListApi = async ({
  accessToken,
  ...requset
}: TokenWithType<PagenationRequestType>) => {
  const response = await instanceAxios.get("/drafts", {
    headers: authorizationHeader(accessToken),
    params: {
      ...requset,
    },
  });

  return [response.data, response.status];
};

export const getDraftDetailApi = async ({
  accessToken,
  ...request
}: TokenWithType<NoticeDetailRequestType>) => {
  const response = await instanceAxios.get(`/drafts/${request.id}`, {
    headers: authorizationHeader(accessToken),
  });

  return [response.data, response.status];
};

export const imageUploadApi = async ({
  accessToken,
  ...requset
}: TokenWithType<ImageUploadRequestType>) => {
  const formData = new FormData();

  for (let i = 0; i < requset.images.length; i++) {
    formData.append("images", requset.images[i]);
  }

  const response = await instanceAxios.post("/images", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "multipart/form-data",
    },
  });

  return [response.data, response.status];
};

export const getCommunityRulesApi = async ({ accessToken }: AccessToken) => {
  const response = await instanceAxios.get("/community/rules", {
    headers: authorizationHeader(accessToken),
  });

  return [response.data, response.status];
};

export const getStudentQuestionApi = async ({ accessToken }: AccessToken) => {
  const response = await instanceAxios.get("/students/questions", {
    headers: authorizationHeader(accessToken),
  });

  return [response.data, response.status];
};

export const submitStudentAnswerApi = async ({
  accessToken,
  questionId,
  ...request
}: TokenWithType<SubmitAnswer>) => {
  const response = await instanceAxios.post(
    `/students/questions/${questionId}/answer`,
    request,
    {
      headers: authorizationHeader(accessToken),
    }
  );

  return [response.data, response.status];
};

export const postDraftApi = async ({
  accessToken,
  document_key,
  ...request
}: TokenWithType<PostDrafts>) => {
  const response = await instanceAxios.post("drafts", request, {
    headers: {
      ...authorizationHeader(accessToken),
      "X-Document-Key": document_key,
    },
  });

  return [response.data, response.status];
};

export const approveDraftApi = async ({
  accessToken,
  ...requset
}: TokenWithType<DraftApprove>) => {
  const response = await instanceAxios.patch(
    `/drafts/${requset.draftId}/approve`,
    null,
    {
      headers: authorizationHeader(accessToken),
    }
  );

  return [response.data, response.status];
};

export const rejectDraftApi = async ({
  accessToken,
  ...requset
}: TokenWithType<DraftApprove>) => {
  const response = await instanceAxios.patch(
    `/drafts/${requset.draftId}/disapprove`,
    null,
    {
      headers: authorizationHeader(accessToken),
    }
  );

  return [response.data, response.status];
};
