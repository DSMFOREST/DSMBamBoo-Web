import {
  GET_CATEGORY_LIST_ASYNC,
  RESET_STATUS,
  SearchActions,
} from "data/actions/search";
import { CategoryItem } from "data/middleware/api/apiTypes";
import { API_STATUS } from "data/middleware/api";
import { returnApiResponseData } from "..";

export type InitialState = {
  getCategoryStatus: number;
  categoryData: CategoryItem | null;
};

const initialState: InitialState = {
  getCategoryStatus: 0,
  categoryData: null,
};

const searchReducer = (
  state = initialState,
  action: SearchActions
): InitialState => {
  switch (action.type) {
    case GET_CATEGORY_LIST_ASYNC:
      return returnApiResponseData<InitialState>({
        state,
        statusName: API_STATUS.getCategoryStatus,
        payload: action.payload,
        dataKeyName: "categoryData",
        isOnlyData: true,
      });
    case RESET_STATUS:
      return {
        ...state,
        getCategoryStatus: 0,
      };
    default:
      return state;
  }
};

export default searchReducer;
