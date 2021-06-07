import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Issues } from '../pages/Issues';
import { Header } from '../components/Header';

export const Router = () => {
  return (
    <>
      <Header team="angular" repo="angular-cli" />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Issues />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
