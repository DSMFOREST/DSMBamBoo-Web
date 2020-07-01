import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategoryListAction, resetStatusAction } from "data/actions/search";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/search";
import { AccessToken } from "data/middleware/api/apiTypes";

export const useSearchRedux = () => {
  const dispatch = useDispatch();
  const searchStore = useSelector<AppState, InitialState>((state) => ({
    categoryData: state.search.categoryData,
    getCategoryStatus: state.search.getCategoryStatus,
  }));

  const getCategoryList = useCallback(
    (payload: AccessToken) => {
      dispatch(getCategoryListAction(payload));
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const searchReducer = {
    getCategoryList,
    resetStatus,
  };

  return { searchStore, searchReducer };
};
