/**
 * Created by jahansj on 01/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { DisplayField } from '../../sub-components/subcomponents';
import {
    UPDATE_ERROR,
    UPDATE_TOILET_TIME_PER_YEAR,
    UPDATE_TOILET_TIME_PER_MONTH,
    UPDATE_TOILET_TIME_PER_WEEK,
    UPDATE_TOILET_PAY_PER_YEAR,
    UPDATE_TOILET_PAY_PER_MONTH,
    UPDATE_TOILET_PAY_PER_WEEK
} from '../../actions/updateActions';
import s from '../defaults.css';

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
      user: store.login.login.user
    }
  }
})
export default class DisplayStats extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    socket.on('calculate', (socket) => this.calculate(socket));
  }

  calculate(socket) {
    return new Promise((resolve, reject) => {
      const type = typeof socket;

      switch (type) {
        case 'object':
          return resolve (socket);

        case 'string':
          return resolve(JSON.parse(socket));

        default:
          return reject(console.warn(`App: Event: Calculate: Expected to receive object, got ${type} instead`));
      }
    }).then((val) => {
      store.dispatch(UPDATE_TOILET_TIME_PER_YEAR(val.timePerYear));
      store.dispatch(UPDATE_TOILET_TIME_PER_MONTH(val.timePerMonth));
      store.dispatch(UPDATE_TOILET_TIME_PER_WEEK(val.timePerWeek));
      store.dispatch(UPDATE_TOILET_PAY_PER_YEAR(val.payPerYear));
      store.dispatch(UPDATE_TOILET_PAY_PER_MONTH(val.payPerMonth));
      store.dispatch(UPDATE_TOILET_PAY_PER_WEEK(val.payPerWeek));
      
    }).catch((err) => {
      store.dispatch(UPDATE_ERROR(err));
    });
  }
  
  render() {
    return (
        <div className={s.container}>
          <DisplayField
              containerClass={`${s.fieldWrapper}  ${s.paddedBlock}`}
              sharedClass={s.displayField}
              displayText={[
                `Welcome ${this.props.login.user}, view your stats here:`,
                `Type of break: ${this.props.userStats.typeOfBreaks}`,
                `Salary: ${this.props.userStats.salary}`,
                `Hours per week: ${this.props.userStats.hoursPerWeek}`,
                `Average length of breaks: ${this.props.userStats.averageLengthOfBreaks}m`,
                `Amount of breaks: ${this.props.userStats.amountOfBreaks} per week`
            ]}
          />

          <DisplayField
            containerClass={`${s.fieldWrapper} ${s.paddedBlock}`}
            sharedClass={s.displayField}
            displayText={[
              `${this.props.userStats.typeOfBreaks} Time:`,
              `Yearly: ${this.props.userStats.time.perYear}hrs`,
              `Monthly: ${this.props.userStats.time.perMonth}hrs`,
              `Weekly: ${this.props.userStats.time.perWeek}hrs`
            ]}
          />

          <DisplayField
            containerClass={`${s.fieldWrapper} ${s.paddedBlock}`}
            sharedClass={s.displayField}
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