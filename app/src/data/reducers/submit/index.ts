import {
  IMAGES_UPLOAD_ASYNC,
  POST_NOTICE_ASYNC,
  POST_DRAFT_ASYNC,
  RESET_STATUS,
  SubmitActions,
} from "data/actions/submit";
import { TransformImages } from "data/middleware/api/apiTypes";
import { API_STATUS } from "data/middleware/api";
import { returnApiResponseData } from "..";

export type InitialState = {
  imagesUploadStatus: number;
  postNoticeStatus: number;
  postDraftStatus: number;
  exchangeImageData: TransformImages | null;
};

const initialState: InitialState = {
  imagesUploadStatus: 0,
  postNoticeStatus: 0,
  postDraftStatus: 0,
  exchangeImageData: null,
};

const submitReducer = (
  state = initialState,
  action: SubmitActions
): InitialState => {
  switch (action.type) {
    case IMAGES_UPLOAD_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.imagesUploadStatus,
        payload: action.payload,
        dataKeyName: "exchangeImageData",
      });
    case POST_NOTICE_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.postNoticeStatus,
        payload: action.payload,
      });
    case POST_DRAFT_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.postDraftStatus,
        payload: action.payload,
      });
    case RESET_STATUS:
      return {
        ...state,
        imagesUploadStatus: 0,
        postNoticeStatus: 0,
        postDraftStatus: 0,
      };
    default:
      return state;
  }
};

export default submitReducer;
