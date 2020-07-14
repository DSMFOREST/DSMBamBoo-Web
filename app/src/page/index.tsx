import React, { FC, useEffect, useCallback, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";
import "firebase/messaging";

import GlobalStyle from "../styles/GlobalStyle";
import { DecodingToken } from "data/middleware/api/apiTypes";
import { Main, Header, Footer } from "components/index";
import { LoginModal, ReportModal } from "components/modal";
import ScrollToTop from "components/common/pageFilter/ScrollToTop";
import { useModalRedux } from "container/modal";
import { useAuthRedux } from "container/auth";
import { decodingToToken } from "utils/convert";
import {
  setDeviceToken,
  getTokenToStorage,
  getAdminRefreshToken,
} from "utils/stroage";

const App: FC = () => {
  const messaging = firebase.messaging();
  const didMountRef = useRef(false);
  const {
    modalStore: { isOpenLoginModal, isOpenReportModal },
  } = useModalRedux();
  const {
    authStore: { access_token },
    authReducer: {
      refreshDeviceToken,
      refreshAuthorizationToken,
      userLogin,
      setAuthorizationTokens,
      setIsAdmin,
    },
  } = useAuthRedux();

  const getDeviceToken = useCallback(async () => {
    try {
      await messaging.requestPermission();
      const token = await messaging.getToken();

      await userLogin({ device_token: token });
      await setDeviceToken(token);
    } catch (err) {
      alert("페이지 notification알림을 허용하여주십시오.");
    }
  }, [messaging, userLogin]);

  const onTokenRefresh = useCallback(
    messaging.onTokenRefresh(async () => {
      try {
        const newToken = await messaging.getToken();

        await refreshDeviceToken({
          accessToken: access_token,
          device_token: newToken,
        });
        await setDeviceToken(newToken);
      } catch (err) {
        alert("페이지 notification알림을 허용하여주십시오.");
      }
    }),
    [messaging]
  );

  const onCheckMessages = useCallback(
    messaging.onMessage((p) => {
      console.log(p);
      toast(
        <div>
          {/* <p>{data.title}</p> */}
          <br />
          <br />
          {/* <p>{data.body}</p> */}
        </div>
      );
    }),
    [messaging]
  );

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      setAuthorizationTokens({
        access_token: getTokenToStorage("accessToken"),
        refresh_token: getTokenToStorage("refreshToken"),
      });
      getDeviceToken();
      onTokenRefresh();
      onCheckMessages();
      if (getAdminRefreshToken()) {
        refreshAuthorizationToken({
          refresh_token: getAdminRefreshToken() ?? "",
        });
      }
    }
  }, [
    didMountRef,
    getDeviceToken,
    onCheckMessages,
    onTokenRefresh,
    refreshAuthorizationToken,
    setAuthorizationTokens,
  ]);

  useEffect(() => {
    setIsAdmin(
      decodingToToken<DecodingToken>(getTokenToStorage("accessToken"))
        ?.roles[0] === "ROLE_ADMIN"
    );
  }, [access_token, setIsAdmin]);

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
            <Route
              path={["/", "/:type", "/:type/:id"]}
              render={() => <Main />}
              exact
            />
          </>
        </ScrollToTop>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
