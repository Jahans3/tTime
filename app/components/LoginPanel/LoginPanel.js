/**
 * Created by jahansj on 26/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store from '../../store';
import {
    LOGIN_CREDENTIALS_REQUEST,
    LOGIN_CREDENTIALS_FAILURE,
    LOGIN_CREDENTIALS_SUCCESS
} from '../../actions/loginActions';
import { InputBlock } from '../../sub-components/subcomponents';
import d from '../defaults.css';

@connect((store) => {
  return {
    login: {
      authInProgress: store.login.login.authInProgress,
      user: store.login.login.user,
      authenticated: store.login.login.authenticated
    }
  }
})
export default withRouter(class LoginPanel extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    document.getElementById('loginSubmit').addEventListener('click', (e) => {
      e.preventDefault();

      this.submitLogin()
        .then((val) => {
          store.dispatch(LOGIN_CREDENTIALS_SUCCESS(val));
          this.props.router.replace('authenticated');
        }).catch((err) => {
        console.log(err);
          store.dispatch(LOGIN_CREDENTIALS_FAILURE(err));
        });
    });
  }

  parseFormData() {
    const args = arguments;
    let body;

    for (let i = 0, length = args.length; i < length; i++) {
      const argExists = args[i].split('=')[1].length >= 1;

      if (argExists) {
        body = `${body ? `${body}&` : ''}${args[i]}`;
      }
    }

    return body;
  }

  /**
   * Submit login credentials
   * @returns {Promise}
   */
  submitLogin() {
    const email = `email=${document.getElementById('usernameInput').value}`;
    const password = `password=${document.getElementById('passwordInput').value}`;

    // do some client-side validation

    const parsed = this.parseFormData(email, password);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', encodeURI('http://localhost:3030/login'));
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onload = () => {
        const res = xhr.response;

        console.log(res);
        
        if (!res || xhr.status !== 200) {
          reject(`${xhr.status}: ${xhr.statusText}`);
        }
        
        resolve(res);
      };
      
      store.dispatch(LOGIN_CREDENTIALS_REQUEST());
      xhr.send(parsed);
    });
  }

  render() {
    let loader;
    let containerClasses;
    let errorMessage;

    if (this.props.login.authInProgress) {
      loader = <div className={d.loader}>Woooooooooooo loading</div>;
    }
    
    if (this.props.login.failedLogin) {
      errorMessage = <h4>Invalid credentials</h4>;
    }

    if (this.props.customClass) {
      containerClasses = `${d.container} ${this.props.customClass}`;
    } else {
      containerClasses = d.container;
    }

    return (
        <div className={containerClasses}>
          <form>

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="usernameInput"
                labelText="Username:"
                inputId="usernameInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="passwordInput"
                labelText="Password:"
                inputId="passwordInput"
            />

            <div className={d.paddedBlock}>
              <button className={d.button} id="loginSubmit">Submit</button>
            </div>
          </form>

          {
              errorMessage
          }

          {
              loader
          }
          
        </div>
    )
  }
});