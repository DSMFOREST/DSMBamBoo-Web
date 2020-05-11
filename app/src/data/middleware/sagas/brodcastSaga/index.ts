import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_ROOM_LIST,
  GET_ROOM_LIST_ASYNC,
  SET_ADMIN_SELECTED,
  SET_ADMIN_SELECTED_ASYNC,
  STOP_STREAMING,
  STOP_STREAMING_ASYNC,
  getRoomListType,
  getRoomListPayload,
  setAdminSelectedType,
  setAdminSelectedPayload,
  stopStreamingType,
  stopStreamingPayload,
  GetRoomList,
  SetAdminSelected,
  StopStreaming,
} from "actions/brodcast";
import { getRoomListApi } from "middleware/api";
import { sagaEntity } from "middleware/sagas";

function* getRoomList(action: GetRoomList) {
  yield sagaEntity<getRoomListType, getRoomListPayload>({
    action,
    api: getRoomListApi,
    type: GET_ROOM_LIST_ASYNC,
  });
}

function* setAdminSelected(action: SetAdminSelected) {
  yield sagaEntity<setAdminSelectedType, setAdminSelectedPayload>({
    action,
    api: getRoomListApi,
    type: SET_ADMIN_SELECTED_ASYNC,
  });
}

function* stopStreaming(action: StopStreaming) {
  yield sagaEntity<stopStreamingType, stopStreamingPayload>({
    action,
    api: getRoomListApi,
    type: STOP_STREAMING_ASYNC,
  });
}

function* watchGetRoomList() {
  yield takeLatest(GET_ROOM_LIST, getRoomList);
}

function* watchSetAdminSelected() {
  yield takeLatest(SET_ADMIN_SELECTED, setAdminSelected);
}

function* watchStopStreaming() {
  yield takeLatest(STOP_STREAMING, stopStreaming);
}

export default function* brodcastSaga() {
  yield all([
    fork(watchGetRoomList),
    fork(watchSetAdminSelected),
    fork(watchStopStreaming),
  ]);
}
