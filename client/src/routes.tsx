import React, { ReactElement } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
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
        <Route path="/" element={<App />} />
        <Route path="/summoners-rift" element={<SummonersRift />} />
      </Routes>
    </animated.div>
  ));
};

export default AppRoutes;
