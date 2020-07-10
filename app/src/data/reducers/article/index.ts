import {
  GET_ARTICLE_LIST_ASYNC,
  GET_ARTICLE_DETAIL_ASYNC,
  RESET_STATUS,
  ArticleActions,
} from "data/actions/article";
import { NoticeItem, PagenationType } from "data/middleware/api/apiTypes";
import { API_STATUS } from "data/middleware/api";
import { returnApiResponseData } from "..";

export type InitialState = {
  getArticleStatus: number;
  getArticleDetailStatus: number;
  articleData: PagenationType<NoticeItem[]> | null;
  articleDetail: NoticeItem | null;
};

const initialState: InitialState = {
  getArticleStatus: 0,
  getArticleDetailStatus: 0,
  articleData: null,
  articleDetail: null,
};

const articleReducer = (
  state = initialState,
  action: ArticleActions
): InitialState => {
  switch (action.type) {
    case GET_ARTICLE_LIST_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getArticleStatus,
        payload: action.payload,
        dataKeyName: "articleData",
      });
    case GET_ARTICLE_DETAIL_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getArticleDetailStatus,
        payload: action.payload,
        dataKeyName: "articleDetail",
      });
    case RESET_STATUS:
      return {
        ...state,
        getArticleStatus: 0,
        getArticleDetailStatus: 0,
      };
    default:
      return state;
  }
};

export default articleReducer;
