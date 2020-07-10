import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCommunityRulesAction,
  resetStatusAction,
} from "data/actions/community";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/community";
import { AccessToken } from "data/middleware/api/apiTypes";

export const useCommunityRedux = () => {
  const dispatch = useDispatch();
  const communityStore = useSelector<AppState, InitialState>((state) => ({
    rules: state.community.rules,
    getCommunityRulesStatus: state.community.getCommunityRulesStatus,
  }));

  const getCommunityRules = useCallback(
    (payload: AccessToken) => {
      dispatch(getCommunityRulesAction(payload));
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const communityReducer = {
    getCommunityRules,
    resetStatus,
  };

  return { communityStore, communityReducer };
};
