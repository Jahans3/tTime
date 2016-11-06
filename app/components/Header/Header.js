/**
 * Created by jahansj on 06/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import store from '../../store';
import { DisplayField } from '../../sub-components/subcomponents';
import d from '../defaults.css';
import s from './Header.css';

@connect((store) => {
  return {
    login: {
      user: store.login.login.user,
      authenticated: store.login.login.authenticated
    }
  }
})
export default withRouter(class Header extends Component {
  constructor() {
    super();

    this.content = (
        <DisplayField
          containerClass={`${d.fieldWrapper}  ${d.paddedBlock}`}
          sharedClass={`${d.displayField}`}
          displayText={[
                    <Link to="login" key="1"> Login </Link>,
                    <Link to="signup" key="2"> Signup </Link>
          ]}
        />
    );
  }

  render() {
    if (this.props.login.authenticated) {
      this.content = (
          <DisplayField
              containerClass={`${d.fieldWrapper} ${d.paddedBlock}`}
              sharedClass={`${d.displayField}`}
              displayText={[
              `Welcome ${this.props.login.user}`,
              <Link to="authenticated/input" key="2"> Input </Link>,
              <Link to="authenticated/display" key="3"> Display </Link>
            ]}
          />
      )
    }
    return (
        <div>
          {
            this.content
          }
        </div>
    )
  }
});