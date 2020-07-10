import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDraftListAction,
  getDraftDetailAction,
  resetStatusAction,
} from "data/actions/draft";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/draft";
import {
  TokenWithType,
  PagenationRequestType,
  NoticeDetailRequestType,
} from "data/middleware/api/apiTypes";

export const useDraftRedux = () => {
  const dispatch = useDispatch();
  const draftStore = useSelector<AppState, InitialState>((state) => ({
    draftData: state.draft.draftData,
    draftDetail: state.draft.draftDetail,
    getDraftStatus: state.draft.getDraftStatus,
    getDraftDetailStatus: state.draft.getDraftDetailStatus,
  }));

  const getDraftList = useCallback(
    (payload: TokenWithType<PagenationRequestType>) => {
      dispatch(getDraftListAction(payload));
    },
    [dispatch]
  );

  const getDraftDetail = useCallback(
    (payload: TokenWithType<NoticeDetailRequestType>) => {
      dispatch(getDraftDetailAction(payload));
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const draftReducer = {
    getDraftList,
    getDraftDetail,
    resetStatus,
  };

  return { draftStore, draftReducer };
};
