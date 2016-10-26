/**
 * Created by jahansj on 26/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './LoginPanel.css';

@connect((store) => {
  return {
    authInProgress: store.login.authInProgress,
    user: store.login.user,
    authenticated: store.login.authenticated
  }
})
export default class LoginPanel extends Component {
  constructor() {
    super();
  }

  render() {
    let loader;
    let containerClasses;

    if (this.props.authInProgress) {
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
              <button className={s.button}>Submit</button>
            </div>
          </form>

          {
              loader
          }
        </div>
    )
  }
}