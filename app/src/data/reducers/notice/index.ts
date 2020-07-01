import {
  GET_NOTICE_LIST_ASYNC,
  RESET_STATUS,
  NoticeActions,
} from "data/actions/notice";
import { NoticeItem, PagenationType } from "data/middleware/api/apiTypes";
import { API_STATUS } from "data/middleware/api";
import { returnApiResponseData } from "..";

export type InitialState = {
  getNoticeStatus: number;
  noticeData: PagenationType<NoticeItem[]> | null;
};

const initialState: InitialState = {
  getNoticeStatus: 0,
  noticeData: null,
};

const noticeReducer = (
  state = initialState,
  action: NoticeActions
): InitialState => {
  switch (action.type) {
    case GET_NOTICE_LIST_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getNoticeStatus,
        payload: action.payload,
        dataKeyName: "noticeData",
      });
    case RESET_STATUS:
      return {
        ...state,
        getNoticeStatus: 0,
      };
    default:
      return state;
  }
};

export default noticeReducer;
