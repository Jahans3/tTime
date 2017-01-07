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
import DataHelper from '../../helpers/DataHelper';
import s from './LoginPanel.scss';

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
          store.dispatch(LOGIN_CREDENTIALS_FAILURE(err));
        });
    });
  }

  /**
   * Submit login credentials
   * @returns {Promise}
   */
  submitLogin() {
    const email = `email=${document.getElementById('usernameInput').value}`;
    const password = `password=${document.getElementById('passwordInput').value}`;

    // do some client-side validation

    const parsed = DataHelper.parseFormData(email, password);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', encodeURI('http://localhost:3030/auth/login'));
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onload = () => {
        if (typeof xhr.response == 'undefined' || xhr.status !== 200) {
          return reject(`${xhr.status}: ${xhr.statusText}`);
        }

        const res = JSON.parse(xhr.response);

        resolve(res);
      };
      
      store.dispatch(LOGIN_CREDENTIALS_REQUEST());
      xhr.send(parsed);
    });
  }

  render() {
    return (
        <div>
          <form>

            <InputBlock
                containerClass={ s.inputWrapper }
                labelClass={ s.inputText }
                inputName="usernameInput"
                labelText="Username:"
                inputId="usernameInput"
            />

            <InputBlock
                containerClass={ s.inputWrapper }
                labelClass={ s.inputText }
                inputName="passwordInput"
                labelText="Password:"
                inputId="passwordInput"
            />

            <div className={ s.submitWrapper }>
              <button id="loginSubmit" className="button-primary">Submit</button>
            </div>
          </form>
        </div>
    )
  }
});