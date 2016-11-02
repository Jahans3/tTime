/**
 * Created by jahansj on 26/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from '../defaults.css';
import store from '../../store';
import {
    LOGIN_CREDENTIALS_REQUEST,
    LOGIN_CREDENTIALS_FAILURE,
    LOGIN_CREDENTIALS_SUCCESS
} from '../../actions/loginActions';

@connect((store) => {
  return {
    login: {
      authInProgress: store.login.login.authInProgress,
      user: store.login.login.user,
      authenticated: store.login.login.authenticated
    }
  }
})
export default class LoginPanel extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    document.getElementById('loginSubmit').addEventListener('click', () => {
      console.log('clicky');
      this.submitLogin().then((val) => {
        store.dispatch(LOGIN_CREDENTIALS_SUCCESS(val));
      }).catch((err) => {
        store.dispatch(LOGIN_CREDENTIALS_FAILURE());
      });
    });
  }
  
  submitLogin() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    
    // do some client-side validation
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', encodeURI('http://localhost:3030/login'));
      
      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(`${xhr.status}: ${xhr.statusText}`);
        }
        
        resolve(xhr.response);
      };
      
      store.dispatch(LOGIN_CREDENTIALS_REQUEST());
      xhr.send();
    });
  }

  render() {
    let loader;
    let containerClasses;

    if (this.props.login.authInProgress) {
      loader = <div className={s.loader}></div>;
    }

    if (this.props.customClass) {
      containerClasses = `${s.container} ${this.props.customClass}`;
    } else {
      containerClasses = s.container;
    }

    return (
        <div className={containerClasses}>
          <form>

            <div className={s.paddedBlock}>
              <label className={s.label} htmlFor="usernameInput">Username:</label>
              <input className={s.input} id="usernameInput" type="text" name="usernameInput"/>
            </div>

            <div className={s.paddedBlock}>
              <label className={s.label} htmlFor="passwordInput">Password:</label>
              <input className={s.input} id="passwordInput" type="text" name="passwordInput"/>
            </div>

            <div className={s.paddedBlock}>
              <button type="submit" className={s.button} id="loginSubmit">Submit</button>
            </div>
          </form>

          {
              loader
          }
          
        </div>
    )
  }
}