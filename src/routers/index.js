import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Issues } from '../pages/Issues';
import { Header } from '../components/Header';
import { Detail } from '../pages/Detail';

export const Router = () => {
  return (
    <>
      <Header team="angular" repo="angular-cli" />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Issues />
          </Route>
          <Route path="/detail/:issue_number" exact>
            <Detail />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
