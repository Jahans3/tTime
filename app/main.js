/**
 * Created by jahansj on 21/10/2016.
 */
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App/App';
import LoginPanel from './components/LoginPanel/LoginPanel';

ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/login" component={LoginPanel} />
      </Router>
    </Provider>,
    document.getElementById('entry')
);