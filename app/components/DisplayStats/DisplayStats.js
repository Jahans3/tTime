/**
 * Created by jahansj on 01/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DisplayField } from '../../sub-components/subcomponents';

@connect((store) => {
  return {
    userStats: {
      salary: store.update.userStats.salary,
      typeOfBreaks: store.update.userStats.typeOfBreaks,
      hoursPerWeek: store.update.userStats.hoursPerWeek,
      amountOfBreaks: store.update.userStats.amountOfBreaks,
      averageLengthOfBreaks: store.update.userStats.averageLengthOfBreaks,
      time: {
        perYear: store.update.userStats.time.perYear,
        perMonth: store.update.userStats.time.perMonth,
        perWeek: store.update.userStats.time.perWeek
      },
      pay: {
        perYear: store.update.userStats.pay.perYear,
        perMonth: store.update.userStats.pay.perMonth,
        perWeek: store.update.userStats.pay.perWeek
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
export default class DisplayStats extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
        <div>
          <DisplayField
              displayText={[
                `Welcome ${this.props.login.user.forename || this.props.login.user.email}, view your stats here:`,
                `Type of break: ${this.props.userStats.typeOfBreaks}`,
                `Salary: £${this.props.userStats.salary}`,
                `Hours per week: ${this.props.userStats.hoursPerWeek}`,
                `Average length of breaks: ${this.props.userStats.averageLengthOfBreaks}m`,
                `Amount of breaks: ${this.props.userStats.amountOfBreaks} per week`
            ]}
          />

          <DisplayField
            displayText={[
              `${this.props.userStats.typeOfBreaks} Time:`,
              `Yearly: ${this.props.userStats.time.perYear}hrs`,
              `Monthly: ${this.props.userStats.time.perMonth}hrs`,
              `Weekly: ${this.props.userStats.time.perWeek}hrs`
            ]}
          />

          <DisplayField
            displayText={[
              `${this.props.userStats.typeOfBreaks} Pay:`,
              `Yearly: £${this.props.userStats.pay.perYear}`,
              `Monthly: £${this.props.userStats.pay.perMonth}`,
              `Weekly: £${this.props.userStats.pay.perWeek}`
            ]}
          />
        </div>
    )
  }
}