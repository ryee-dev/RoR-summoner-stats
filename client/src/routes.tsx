import React, { ReactElement } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import SummonersRift from './pages/summoners-rift/SummonersRift';
import App from './App';

// interface RouteProps {}

// @ts-ignore
const AppRoutes: () => any[ReactElement] = () => {
  const location = useLocation();
  const routeTransitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return routeTransitions((props, item) => (
    <animated.div style={props}>
      <Switch location={item}>
        <Route exact path="/" component={App} />
        <Route path="/summoners-rift" component={SummonersRift} />
      </Switch>
    </animated.div>
  ));
};

export default AppRoutes;
