/**
 * Created by jahansj on 13/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store from '../../store';
import {
  LOGIN_CRENDENTIALS_REQUEST,
  LOGIN_CREDENTIALS_SUCCESS,
  LOGIN_CREDENTIALS_FAILURE
} from '../../actions/loginActions';

import s from '../../sub-components/subcomponents.css';

@connect((store) => {
  return { }
})
export default withRouter(class SocialLoginButton extends Component {
  constructor() {
    super();
  }

  componentDidMount(){
    document.getElementById(`SocialLogin-${this.props.type}`).addEventListener('click', (e) => {
      e.preventDefault();

      this.submitLogin()
          .then((val) => {
            store.dispatch(LOGIN_CREDENTIALS_SUCCESS(val));
            this.props.router.replace('authenticated');
          })
          .catch((err) => {
            store.dispatch(LOGIN_CREDENTIALS_FAILURE(err));
          });
    });
  }

  submitLogin() {
    const loginType = this.props.type.toLowerCase();
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', encodeURI(`http://localhost:3030/auth/${loginType}`));
      
      xhr.onload = () => {
        const res = xhr.response;
        
        if (!res || xhr.status !== 200) {
          return reject(`${xhr.status}: ${xhr.statusText}`);
        }
        
        resolve(res);
      };

      xhr.send();
    });
  }

  render() {
    return (
        <div className={s.twitter}>
          <a id={`SocialLogin-${this.props.type}`}>
            { this.props.buttonText }
          </a>
        </div>
    )
  }
});