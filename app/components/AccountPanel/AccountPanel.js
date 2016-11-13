/**
 * Created by jahansj on 13/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DisplayField } from '../../sub-components/subcomponents';
import s from './AccountPanel.css';
import d  from '../defaults.css';

@connect((store) => {
  return {
    login: {
      user: {
        name: store.login.login.user.name,
        email: store.login.login.user.email
      }
    }
  }
})
export default withRouter(class AccountPanel extends Component {
  constructor() {
    super();
  }
  
  render() {
    let user;

    if (this.props.login.user.name) {
      user = this.props.login.user.name;
    }
    else {
      user = this.props.login.user.email;
    }
    
    return (
      <div>
        <h1>Welcome, { this.props.login.user.name || this.props.login.user.email }</h1>

        {
          this.props.children
        }
      </div>
    )
  }
})