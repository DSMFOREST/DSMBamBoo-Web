import React, { FC, useEffect, useCallback, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase";

import GlobalStyle from "../styles/GlobalStyle";
import { Main, Header } from "components/index";
import { LoginModal, ReportModal } from "components/modal";
import ScrollToTop from "components/common/pageFilter/ScrollToTop";
import { useModalRedux } from "container/modal";

const App: FC = () => {
  const messaging = firebase.messaging();
  const didMountRef = useRef(false);
  const {
    modalStore: { isOpenLoginModal, isOpenReportModal },
  } = useModalRedux();

  const getDeviceToken = useCallback(async () => {
    try {
      await messaging.requestPermission();
      const token = await messaging.getToken();

      console.log(token);
    } catch (err) {
      alert("페이지 notification알림을 허용하여주십시오.");
    }
  }, [messaging]);

  const onTokenRefresh = useCallback(
    messaging.onTokenRefresh(async () => {
      try {
        const newToken = await messaging.getToken();

        console.log("refreshed", newToken);
      } catch (err) {
        console.log("Unable to retrieve refreshed token");
      }
    }),
    [messaging]
  );

  const onCheckMessages = useCallback(
    messaging.onMessage(({ data }) => {
      toast(
        <div>
          <p>{data.title}</p>
          <br />
          <br />
          <p>{data.body}</p>
        </div>
      );
    }),
    [messaging]
  );

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      getDeviceToken();
      onTokenRefresh();
      onCheckMessages();
    }
  }, [didMountRef, getDeviceToken, messaging, onCheckMessages, onTokenRefresh]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <GlobalStyle />
      <Header />
      {isOpenLoginModal && <LoginModal />}
      {isOpenReportModal && <ReportModal />}
      <Switch>
        <ScrollToTop>
          <>
            <Route path={["/", "/notice"]} render={() => <Main />} exact />
          </>
        </ScrollToTop>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
