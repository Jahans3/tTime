/**
 * Created by jahansj on 21/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import LoginPanel from '../LoginPanel/LoginPanel';
import d from '../defaults.css';

/**
 * App
 * Root component
 */
@connect((store) => {
  return {
    login: {
      authenticated: store.login.login.authenticated
    }
  }
})
export default class App extends Component {
  constructor(){
    super();
  }

  render() {
    
    return (
        <div className={d.container}>
          <h1 className={d.title}>_ Time</h1>

          {
              this.props.children || <LoginPanel />
          }
        </div>
    )
  }
}