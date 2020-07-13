import {
  GET_DRAFT_LIST_ASYNC,
  GET_DRAFT_DETAIL_ASYNC,
  APPROVE_DRAFT_ASYNC,
  REJECT_DRAFT_ASYNC,
  RESET_STATUS,
  DraftActions,
} from "data/actions/draft";
import { NoticeItem, PagenationType } from "data/middleware/api/apiTypes";
import { API_STATUS } from "data/middleware/api";
import { returnApiResponseData } from "..";

export type InitialState = {
  getDraftStatus: number;
  getDraftDetailStatus: number;
  approveDraftStatus: number;
  rejectDraftStatus: number;
  draftData: PagenationType<NoticeItem[]> | null;
  draftDetail: NoticeItem | null;
};

const initialState: InitialState = {
  getDraftStatus: 0,
  getDraftDetailStatus: 0,
  approveDraftStatus: 0,
  rejectDraftStatus: 0,
  draftData: null,
  draftDetail: null,
};

const draftReducer = (
  state = initialState,
  action: DraftActions
): InitialState => {
  switch (action.type) {
    case GET_DRAFT_LIST_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getDraftStatus,
        payload: action.payload,
        dataKeyName: "draftData",
      });
    case GET_DRAFT_DETAIL_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getDraftDetailStatus,
        payload: action.payload,
        dataKeyName: "draftDetail",
      });
    case APPROVE_DRAFT_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getDraftDetailStatus,
        payload: action.payload,
      });
    case REJECT_DRAFT_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getDraftDetailStatus,
        payload: action.payload,
      });
    case RESET_STATUS:
      return {
        ...state,
        getDraftStatus: 0,
        getDraftDetailStatus: 0,
        approveDraftStatus: 0,
        rejectDraftStatus: 0,
      };
    default:
      return state;
  }
};

export default draftReducer;
