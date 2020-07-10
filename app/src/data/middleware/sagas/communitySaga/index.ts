import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_COMMUNITY_RULES,
  GET_COMMUNITY_RULES_ASYNC,
  getCommunityRulesType,
  getCommunityRulesPayload,
  GetCommunityRules,
} from "data/actions/community";
import { getCommunityRulesApi } from "data/middleware/api";
import { sagaEntity } from "data/middleware/sagas";

function* getCommunityRules(action: GetCommunityRules) {
  yield sagaEntity<getCommunityRulesType, getCommunityRulesPayload>({
    action,
    api: getCommunityRulesApi,
    type: GET_COMMUNITY_RULES_ASYNC,
  });
}

function* watchGetCommunityRules() {
  yield takeLatest(GET_COMMUNITY_RULES, getCommunityRules);
}

export default function* communitySaga() {
  yield all([fork(watchGetCommunityRules)]);
}
