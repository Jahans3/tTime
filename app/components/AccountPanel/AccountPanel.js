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
    userStats: {
      typeOfBreaks: store.update.userStats.typeOfBreaks,
      time: {
        perYear: store.update.userStats.time.perYear
      },
      pay: {
        perYear: store.update.userStats.pay.perYear
      }
    },
    login: {
      user: {
        forename: store.login.login.user.forename,
        surname: store.login.login.user.surname,
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
    return (
      <div>
        <h1>Welcome, { this.props.login.user.forename || this.props.login.user.email }</h1>

        <DisplayField
            containerClass={`${d.fieldWrapper} ${d.paddedBlock}`}
            sharedClass={d.displayField}
            displayText={[
                  `Account details`,
                  `Email: ${this.props.login.user.email}`,
                  `Name: ${this.props.login.user.forename} ${this.props.login.user.surname}`,
                  `Annual ${this.props.userStats.typeOfBreaks} break time: ${this.props.userStats.time.perYear}hrs`,
                  `Annual ${this.props.userStats.typeOfBreaks} break pay: £${this.props.userStats.pay.perYear}`
                ]}
        />
      </div>
    )
  }
})