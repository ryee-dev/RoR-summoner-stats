import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SummonersRift from './pages/SummonersRift';
import TeamfightTactics from './pages/TeamfightTactics';
import App from "./App";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/summoners-rift" component={SummonersRift} />
      <Route path="/teamfight-tactics" component={TeamfightTactics} />
    </Switch>
  );
};

export default AppRoutes;
