import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// @ts-ignore
ReactDOM.render(
  <Suspense
    fallback={
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <h1 style={{ color: 'white' }}>loading...</h1>
      </div>
    }
  >
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/jka5wdi.css" />
    </Helmet>
    <App />
  </Suspense>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
