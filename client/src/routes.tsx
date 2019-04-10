import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import TestApp from './TestApp';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/test" component={TestApp} />
    </Switch>
  );
};

export default AppRoutes;
