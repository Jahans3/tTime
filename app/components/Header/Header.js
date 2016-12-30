/**
 * Created by jahansj on 06/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import store from '../../store';
import SocialLoginButton from '../SocialLoginButton/SocialLoginButton';
import { DisplayField } from '../../sub-components/subcomponents';
import d from '../defaults.css';
import s from './Header.css';

@connect((store) => {
  return {
    login: {
      user: {
        forename: store.login.login.user.forename,
        email: store.login.login.user.email
      },
      authenticated: store.login.login.authenticated
    }
  }
})
export default withRouter(class Header extends Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.login.authenticated) {
      this.content = (
          <DisplayField
              containerClass={`${d.fieldWrapper} ${d.paddedBlock}`}
              sharedClass={`${d.displayField}`}
              displayText={[
                `Welcome ${this.props.login.user.forename || this.props.login.user.email}`,
                <Link to="authenticated/input" key="2"> Input </Link>,
                <Link to="authenticated/display" key="3"> Display </Link>,
                <Link to="authenticated/account" key="4"> Account </Link>
              ]}
          />
      );
    } else {
      this.content = (
          <DisplayField
              containerClass={`${d.fieldWrapper}  ${d.paddedBlock}`}
              sharedClass={`${d.displayField}`}
              displayText={[
                    <Link to="login" key="1"> Login </Link>,
                    <Link to="signup" key="2"> Signup </Link>,
                    <SocialLoginButton 
                      buttonText="Login with Facebook"
                      type="facebook"
                    />
          ]}
          />
      );
    }
    
    return (
        <div>
          <h1 className={d.title}>_ Time</h1>
          {
            this.content
          }
        </div>
    )
  }
});