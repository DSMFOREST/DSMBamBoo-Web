import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  imagesUploadAction,
  resetStatusAction,
  postNoticeAction,
  postDraftAction,
} from "data/actions/submit";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/submit";
import {
  TokenWithType,
  ImageUploadRequestType,
  PostNoticeRequestType,
  PostDrafts,
} from "data/middleware/api/apiTypes";

export const useSubmitRedux = () => {
  const dispatch = useDispatch();
  const submitStore = useSelector<AppState, InitialState>((state) => ({
    exchangeImageData: state.submit.exchangeImageData,
    postDraftStatus: state.submit.postDraftStatus,
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

  const postDraft = useCallback(
    (payload: TokenWithType<PostDrafts>) => {
      dispatch(postDraftAction(payload));
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const submitReducer = {
    imagesUpload,
    postNotice,
    postDraft,
    resetStatus,
  };

  return { submitStore, submitReducer };
};
