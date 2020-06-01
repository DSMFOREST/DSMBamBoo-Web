export const HANDLE_LOGIN_MODAL = "HANDLE_LOGIN_MODAL" as const;
export const HANDLE_REPORT_MODAL = "HANDLE_REPORT_MODAL" as const;

export interface HandleLoginModal {
  type: typeof HANDLE_LOGIN_MODAL;
}
export interface HandleReportModal {
  type: typeof HANDLE_REPORT_MODAL;
}

export type ModalActions = HandleLoginModal | HandleReportModal;

export const handleLoginModalAction = (): ModalActions => ({
  type: HANDLE_LOGIN_MODAL,
});
export const handleReportModalAction = (): ModalActions => ({
  type: HANDLE_REPORT_MODAL,
});
