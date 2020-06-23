import {
  HANDLE_LOGIN_MODAL,
  HANDLE_REPORT_MODAL,
  ModalActions,
} from "data/actions/modal";

export type InitialState = {
  isOpenLoginModal: boolean;
  isOpenReportModal: boolean;
};

const initialState: InitialState = {
  isOpenLoginModal: false,
  isOpenReportModal: false,
};

const modalReducer = (
  state = initialState,
  action: ModalActions
): InitialState => {
  switch (action.type) {
    case HANDLE_LOGIN_MODAL:
      return {
        ...state,
        isOpenLoginModal: !state.isOpenLoginModal,
      };
    case HANDLE_REPORT_MODAL:
      return {
        ...state,
        isOpenReportModal: !state.isOpenReportModal,
      };
    default:
      return state;
  }
};

export default modalReducer;
