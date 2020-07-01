import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getNoticeListAction, resetStatusAction } from "data/actions/notice";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/notice";
import {
  TokenWithType,
  PagenationRequestType,
} from "data/middleware/api/apiTypes";

export const useNoticeRedux = () => {
  const dispatch = useDispatch();
  const noticeStore = useSelector<AppState, InitialState>((state) => ({
    noticeData: state.notice.noticeData,
    getNoticeStatus: state.notice.getNoticeStatus,
  }));

  const getNoticeList = useCallback(
    (payload: TokenWithType<PagenationRequestType>) => {
      dispatch(getNoticeListAction(payload));
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const noticeReducer = {
    getNoticeList,
    resetStatus,
  };

  return { noticeStore, noticeReducer };
};
