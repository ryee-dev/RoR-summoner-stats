import React, { ReactElement } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import SummonersRift from './pages/summoners-rift/SummonersRift';
import App from './App';

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
      <Routes location={item}>
        <Route exact path="/" component={App} />
        <Route path="/summoners-rift" component={SummonersRift} />
      </Routes>
    </animated.div>
  ));
};

export default AppRoutes;
