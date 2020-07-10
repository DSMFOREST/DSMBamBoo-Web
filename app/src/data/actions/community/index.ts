import {
  CategoryItem,
  AccessToken,
  ApiPayload,
} from "data/middleware/api/apiTypes";

export const GET_COMMUNITY_RULES = "GET_COMMUNITY_RULES" as const;
export const GET_COMMUNITY_RULES_ASYNC = "GET_COMMUNITY_RULES_ASYNC" as const;
export const RESET_STATUS = "RESET_STATUS" as const;

export type getCommunityRulesType =
  | typeof GET_COMMUNITY_RULES
  | typeof GET_COMMUNITY_RULES_ASYNC;
export type getCommunityRulesPayload = ApiPayload<CategoryItem[]> & AccessToken;
export interface GetCommunityRules {
  type: getCommunityRulesType;
  payload: getCommunityRulesPayload;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type CommunityActions = GetCommunityRules | ResetStatus;

export const getCommunityRulesAction = (
  payload: AccessToken
): CommunityActions => ({
  type: GET_COMMUNITY_RULES,
  payload,
});

export const resetStatusAction = (): CommunityActions => ({
  type: RESET_STATUS,
});
