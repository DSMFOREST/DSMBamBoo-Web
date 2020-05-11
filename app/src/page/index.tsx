import React, { FC, useEffect, useRef } from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import GlobalStyle from "../styles/GlobalStyle";
import { Main, Header } from "components/index";
import ScrollToTop from "components/common/pageFilter/ScrollToTop";

const App: FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
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
