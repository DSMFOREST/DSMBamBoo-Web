import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  imagesUploadAction,
  resetStatusAction,
  postNoticeAction,
} from "data/actions/submit";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/submit";
import {
  TokenWithType,
  ImageUploadRequestType,
  PostNoticeRequestType,
} from "data/middleware/api/apiTypes";

export const useSubmitRedux = () => {
  const dispatch = useDispatch();
  const submitStore = useSelector<AppState, InitialState>((state) => ({
    exchangeImageData: state.submit.exchangeImageData,
    postNoticeStatus: state.submit.postNoticeStatus,
    imagesUploadStatus: state.submit.imagesUploadStatus,
  }));

  const imagesUpload = useCallback(
    (payload: TokenWithType<ImageUploadRequestType>) => {
      dispatch(imagesUploadAction(payload));
    },
    [dispatch]
  );

  const postNotice = useCallback(
    (payload: TokenWithType<PostNoticeRequestType>) => {
      dispatch(postNoticeAction(payload));
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const submitReducer = {
    imagesUpload,
    postNotice,
    resetStatus,
  };

  return { submitStore, submitReducer };
};
