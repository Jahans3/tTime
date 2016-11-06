/**
 * Created by jahansj on 21/10/2016.
 */
import React from 'react';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App/App';
import LoginPanel from './components/LoginPanel/LoginPanel';
import ActionPanel from './components/ActionPanel/ActionPanel';
import UserdataInput from './components/UserdataInput/UserdataInput';
import DisplayStats from './components/DisplayStats/DisplayStats';

render(
    <Provider store={store}>
      <Router history={hashHistory}>
        
        <Route path="/" component={App} >
          <IndexRoute component={LoginPanel} />
          <Route path="login" component={LoginPanel} />
          
          <Route path="authenticated" component={ActionPanel}>
            <IndexRoute component={UserdataInput} />
            <Route path="input" component={UserdataInput} />
            <Route path="display" component={DisplayStats} />
          </Route>
          
        </Route>
      </Router>
    </Provider>,
    document.getElementById('entry')
);