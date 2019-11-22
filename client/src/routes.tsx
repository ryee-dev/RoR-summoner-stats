import React, { ReactElement } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import SummonersRift from './pages/summoners-rift/SummonersRift';
import TeamfightTactics from './pages/teamfight-tactics/TeamfightTactics';
import App from './App';

// interface RouteProps {}

// @ts-ignore
const AppRoutes: () => any[ReactElement] = () => {
  const location = useLocation();
  const routeTransitions = useTransition(
    location,
    location => location.pathname,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    }
  );

  return routeTransitions.map(({ item: location, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={location}>
        <Route exact path="/" component={App} />
        <Route path="/summoners-rift" component={SummonersRift} />
        <Route path="/teamfight-tactics" component={TeamfightTactics} />
      </Switch>
    </animated.div>
  ));
};

export default AppRoutes;
