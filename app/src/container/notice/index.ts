import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getNoticeListAction,
  getNoticeDetailAction,
  resetStatusAction,
} from "data/actions/notice";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/notice";
import {
  TokenWithType,
  PagenationRequestType,
  NoticeDetailRequestType,
} from "data/middleware/api/apiTypes";

export const useNoticeRedux = () => {
  const dispatch = useDispatch();
  const noticeStore = useSelector<AppState, InitialState>((state) => ({
    noticeData: state.notice.noticeData,
    noticeDetail: state.notice.noticeDetail,
    getNoticeStatus: state.notice.getNoticeStatus,
    getNoticeDetailStatus: state.notice.getNoticeDetailStatus,
  }));

  const getNoticeList = useCallback(
    (payload: TokenWithType<PagenationRequestType>) => {
      dispatch(getNoticeListAction(payload));
    },
    [dispatch]
  );

  const getNoticeDetail = useCallback(
    (payload: TokenWithType<NoticeDetailRequestType>) => {
      dispatch(getNoticeDetailAction(payload));
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const noticeReducer = {
    getNoticeList,
    getNoticeDetail,
    resetStatus,
  };

  return { noticeStore, noticeReducer };
};
