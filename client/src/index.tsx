import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Loading } from './pages/summoners-rift/components';
import App from 'App';

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <Helmet>
      <link rel='stylesheet' href='https://use.typekit.net/jka5wdi.css' />
      <title>Reeg of Regends</title>
    </Helmet>
    <App />
  </Suspense>,
  document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
