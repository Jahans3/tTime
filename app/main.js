/**
 * Created by jahansj on 21/10/2016.
 */
import React from 'react';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App/App';
import LoginPanel from './components/LoginPanel/LoginPanel';
import SignupPanel from './components/SignupPanel/SignupPanel';
import ActionPanel from './components/ActionPanel/ActionPanel';
import UserdataInput from './components/UserdataInput/UserdataInput';
import DisplayStats from './components/DisplayStats/DisplayStats';
import AccountPanel from './components/AccountPanel/AccountPanel';

injectTapEventPlugin();

render(
    <Provider store={store}>
      <Router history={hashHistory}>
        
        <Route path="/" component={App} >
          <IndexRoute component={SignupPanel} />
          <Route path="login" component={LoginPanel} />
          <Route path="signup" component={SignupPanel} />
          
          <Route path="authenticated" component={ActionPanel}>
            <IndexRoute component={UserdataInput} />
            <Route path="input" component={UserdataInput} />
            <Route path="display" component={DisplayStats} />
            <Route path="account" component={AccountPanel} />
          </Route>

          <Route path="fbyes" component={AccountPanel} />
          
        </Route>
      </Router>
    </Provider>,
    document.getElementById('entry')
);