import React, { FC, useEffect, useRef } from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import GlobalStyle from "../styles/GlobalStyle";
import { Main, Header } from "components/index";
import { LoginModal, ReportModal } from "components/modal";
import ScrollToTop from "components/common/pageFilter/ScrollToTop";
import { useModalRedux } from "container/modal";

const App: FC = () => {
  const {
    modalStore: { isOpenLoginModal, isOpenReportModal },
  } = useModalRedux();

  return (
    <BrowserRouter>
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

export default hot(App);
