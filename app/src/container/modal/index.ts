import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleLoginModalAction, handleReportModalAction } from "actions/modal";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/modal";

export const useModalRedux = () => {
  const dispatch = useDispatch();
  const modalStore = useSelector<AppState, InitialState>((state) => ({
    isOpenLoginModal: state.modal.isOpenLoginModal,
    isOpenReportModal: state.modal.isOpenReportModal,
  }));

  const handleLoginModal = useCallback(() => {
    dispatch(handleLoginModalAction());
  }, [dispatch]);

  const handleReportModal = useCallback(() => {
    dispatch(handleReportModalAction());
  }, [dispatch]);

  const modalReducer = {
    handleLoginModal,
    handleReportModal,
  };

  return { modalStore, modalReducer };
};
