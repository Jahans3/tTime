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
      hoursPerWeek: store.update.userStats.hoursPerWeek,
      amountOfBreaks: store.update.userStats.amountOfBreaks,
      averageLengthOfBreaks: store.update.userStats.averageLengthOfBreaks,
      toiletTime: {
        perYear: store.update.userStats.toiletTime.perYear,
        perMonth: store.update.userStats.toiletTime.perMonth,
        perWeek: store.update.userStats.toiletTime.perWeek
      },
      toiletPay: {
        perYear: store.update.userStats.toiletPay.perYear,
        perMonth: store.update.userStats.toiletPay.perMonth,
        perWeek: store.update.userStats.toiletPay.perWeek
      }
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
      store.dispatch(UPDATE_TOILET_TIME_PER_YEAR(val.toiletTimePerYear));
      store.dispatch(UPDATE_TOILET_TIME_PER_MONTH(val.toiletTimePerMonth));
      store.dispatch(UPDATE_TOILET_TIME_PER_WEEK(val.toiletTimePerWeek));
      store.dispatch(UPDATE_TOILET_PAY_PER_YEAR(val.toiletPayPerYear));
      store.dispatch(UPDATE_TOILET_PAY_PER_MONTH(val.toiletPayPerMonth));
      store.dispatch(UPDATE_TOILET_PAY_PER_WEEK(val.toiletPayPerWeek));
      
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
              'Time on Toilet:',
              `Yearly: ${this.props.userStats.toiletTime.perYear}hrs`,
              `Monthly: ${this.props.userStats.toiletTime.perMonth}hrs`,
              `Weekly: ${this.props.userStats.toiletTime.perWeek}hrs`
            ]}
          />

          <DisplayField
            containerClass={`${s.fieldWrapper} ${s.paddedBlock}`}
            sharedClass={s.displayField}
            displayText={[
              'Toilet Pay:',
              `Yearly: £${this.props.userStats.toiletPay.perYear}`,
              `Monthly: £${this.props.userStats.toiletPay.perMonth}`,
              `Weekly: £${this.props.userStats.toiletPay.perWeek}`
            ]}
          />
        </div>
    )
  }
}