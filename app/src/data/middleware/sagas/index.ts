import { put, call, all, select } from "redux-saga/effects";
import { AxiosError } from "axios";

import { refreshAuthorizationTokenApi } from "data/middleware/api";
import { REFRESH_AUTHORIZATION_TOKEN_ASYNC } from "data/actions/auth";
import { clearStorage } from "utils/stroage";
import authSaga from "./authSaga";
import noticeSaga from "./noticeSaga";
import articleSaga from "./articleSaga";
import draftSaga from "./draftSaga";
import searchSaga from "./searchSaga";
import submitSaga from "./submitSaga";
import communitySaga from "./communitySaga";

interface SagaEntityParams<ActionT, PayloadT> {
  action: {
    type: ActionT;
    payload?: PayloadT;
  };
  api: (payload?: any) => Promise<any[]>;
  type: string;
}

export function* sagaEntity<ActionT, PayloadT = object>({
  action,
  api,
  type,
}: SagaEntityParams<ActionT, PayloadT>) {
  try {
    const response = yield call(api, action.payload);

    yield put({ type, payload: { data: response[0], status: response[1] } });
  } catch (_err) {
    const error: AxiosError = _err;

    if (error.response?.status === 401) {
      try {
        const refresh_token: string = yield select(
          (state) => state.auth.refresh_token
        );
        const tokenResponse = yield call(refreshAuthorizationTokenApi, {
          refresh_token,
        });
        yield put({
          type: REFRESH_AUTHORIZATION_TOKEN_ASYNC,
          payload: { data: tokenResponse[0], status: tokenResponse[1] },
        });

        const response = yield call(api, action.payload);
        yield put({
          type,
          payload: {
            data: {
              accessToken: tokenResponse[0].access_token,
              ...response[0],
            },
            status: response[1],
          },
        });
      } catch (err) {
        if (err.response?.status === 401) {
          clearStorage();
          alert("유저 정보 토큰이 만료되어 새로고침됩니다.");
          window.location.reload();
        } else {
          yield put({
            payload: { data: null, status: err.response?.status },
            type,
          });
        }
      }
    } else {
      yield put({
        payload: { data: null, status: error.response?.status },
        type,
      });
    }
  }
}

export default function* rootSaga() {
  yield all([
    call(authSaga),
    call(noticeSaga),
    call(articleSaga),
    call(draftSaga),
    call(searchSaga),
    call(submitSaga),
    call(communitySaga),
  ]);
}
