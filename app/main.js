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
import ActionPanel from './components/ActionPanel/ActionPanel';
import DisplayStats from './components/DisplayStats/DisplayStats';

ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} >
          <Route path="login" component={LoginPanel} />
          <Route path="authenicated" component={ActionPanel}>
            <Route path="display" component={DisplayStats} />
          </Route>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('entry')
);