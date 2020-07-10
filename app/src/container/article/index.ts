import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getArticleListAction,
  getArticleDetailAction,
  resetStatusAction,
} from "data/actions/article";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/article";
import {
  TokenWithType,
  PagenationRequestType,
  NoticeDetailRequestType,
} from "data/middleware/api/apiTypes";

export const useArticleRedux = () => {
  const dispatch = useDispatch();
  const articleStore = useSelector<AppState, InitialState>((state) => ({
    articleData: state.article.articleData,
    articleDetail: state.article.articleDetail,
    getArticleStatus: state.article.getArticleStatus,
    getArticleDetailStatus: state.article.getArticleDetailStatus,
  }));

  const getArticleList = useCallback(
    (payload: TokenWithType<PagenationRequestType>) => {
      dispatch(getArticleListAction(payload));
    },
    [dispatch]
  );

  const getArticleDetail = useCallback(
    (payload: TokenWithType<NoticeDetailRequestType>) => {
      dispatch(getArticleDetailAction(payload));
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const articleReducer = {
    getArticleList,
    getArticleDetail,
    resetStatus,
  };

  return { articleStore, articleReducer };
};
