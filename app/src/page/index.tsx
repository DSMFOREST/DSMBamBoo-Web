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
import { getUUID } from "utils/encrypine";
import {
  setDeviceToken,
  getTokenToStorage,
  getAdminRefreshToken,
} from "utils/stroage";

const App: FC = () => {
  const messaging = firebase.messaging.isSupported()
    ? firebase.messaging()
    : null;

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
  const accessTokenFromStroage = getTokenToStorage("accessToken");

  const getDeviceToken = useCallback(async () => {
    try {
      if (!messaging) throw new Error("IOS");

      await messaging.requestPermission();
      const token = await messaging.getToken();

      await userLogin({ device_token: token });
      await setDeviceToken(token);
    } catch (err) {
      const uuid = getUUID();
      await userLogin({ device_token: uuid });
      await setDeviceToken(uuid);
    }
  }, [messaging, userLogin]);

  const onTokenRefresh = useCallback(() => {
    if (!messaging) return;

    messaging.onTokenRefresh(async () => {
      try {
        const newToken = await messaging.getToken();

        await refreshDeviceToken({
          accessToken: access_token,
          device_token: newToken,
        });
        await setDeviceToken(newToken);
      } catch (err) {}
    });
  }, [access_token, messaging, refreshDeviceToken]);

  const onCheckMessages = useCallback(() => {
    if (!messaging) return;

    messaging.onMessage(({ notification }) => {
      toast(
        <div>
          <p>{notification.title}</p>
          <br />
          <br />
          <p>{notification.body}</p>
        </div>
      );
    });
  }, [messaging]);

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
      decodingToToken<DecodingToken>(accessTokenFromStroage)?.roles[0] ===
        "ROLE_ADMIN"
    );
  }, [accessTokenFromStroage, setIsAdmin]);

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
