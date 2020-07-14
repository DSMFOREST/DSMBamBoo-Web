import { createStore, applyMiddleware } from "redux";
import reduxSaga from "redux-saga";

import reducer from "../reducers";
import sagas from "data/middleware/sagas";

const sagaMiddleWare = reduxSaga();

// redux mapState type
export type AppState = ReturnType<typeof reducer>;

export const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(sagas);
