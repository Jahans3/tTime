/**
 * Created by jahansj on 21/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import LoginPanel from '../LoginPanel/LoginPanel';
import { DisplayField, InputBlock } from '../../sub-components/subcomponents';
import s from './App.css';
import {
    UPDATE_ERROR,
    UPDATE_SALARY,
    UPDATE_HOURS_PER_WEEK,
    UPDATE_AMOUNT_OF_BREAKS,
    UPDATE_AVERAGE_LENGTH_OF_BREAKS,
    UPDATE_TOILET_TIME_PER_YEAR,
    UPDATE_TOILET_TIME_PER_MONTH,
    UPDATE_TOILET_TIME_PER_WEEK
} from '../../actions/updateActions';
import {
    LOGIN_CREDENTIALS_REQUEST,
    LOGIN_CREDENTIALS_FAILURE,
    LOGIN_CREDENTIALS_SUCCESS
} from '../../actions/loginActions';

/**
 * App
 * Root component
 */
@connect((store) => {
  return {
    salary: store.update.salary,
    hoursPerWeek: store.update.hoursPerWeek,
    averageLengthOfBreaks: store.update.averageLengthOfBreaks,
    amountOfBreaks: store.update.amountOfBreaks,
    toiletTime:{
      perYear: store.update.toiletTime.perYear,
      perMonth: store.update.toiletTime.perMonth,
      perWeek: store.update.toiletTime.perWeek
    },
    loginInProgress: store.login.login.authInProgress,
    authenticated: store.login.login.authenticated,
    user: store.login.login.user
  }
})
export default class App extends Component {
  constructor(){
    super();
  }

  submitAll() {
    const salary = document.getElementById('salary').value;
    const hours = document.getElementById('hoursPerWeek').value;
    const length = document.getElementById('averageLengthOfBreaks').value;
    const amount = document.getElementById('amountOfBreaks').value;

    // This must be moved to more suitable location in accordance with Redux
    socket.emit('calculate', {
      pay: salary,
      hoursPerWeek: hours,
      lengthOfBreaks: length,
      breaksPerWeek: amount
    });
    
    store.dispatch((dispatcher) => {
      dispatcher(UPDATE_SALARY(salary));
      dispatcher(UPDATE_HOURS_PER_WEEK(hours));
      dispatcher(UPDATE_AVERAGE_LENGTH_OF_BREAKS(length));
      dispatcher(UPDATE_AMOUNT_OF_BREAKS(amount));
    });
  }

  componentDidMount() {
    document.getElementById('submit').addEventListener('click', () => this.submitAll());
    
    this.calculate()
        .then((val) => {
          store.dispatch(UPDATE_TOILET_TIME_PER_YEAR(val.toiletTimePerYear));
          store.dispatch(UPDATE_TOILET_TIME_PER_MONTH(val.toiletTimePerMonth));
          store.dispatch(UPDATE_TOILET_TIME_PER_WEEK(val.toiletTimePerWeek));
        })
        .catch((err) => {
          store.dispatch(UPDATE_ERROR(err));
        });
  }
  
  calculate() {
    return new Promise((resolve, reject) => {
      socket.on('calculate', (socket) => {
        const type = typeof socket;
        
        switch (type) {
          case 'object':
            return resolve (socket);
          
          case 'string':
            return resolve(JSON.parse(socket));
          
          default:
            return reject(console.warn(`App: Event: Calculate: Expected to receive object, got ${type} instead`));
        }
      });
    });
  }

  render() {
    return (
        <div className={s.container}>
          <h1 className={s.title}>Toilet Time</h1>

          <LoginPanel />

          <div className={s.fieldWrapper}>
            
            <InputBlock
              containerClass={`${s.inputBlock} ${s.paddedBlock}`}
              labelClass={s.label}
              inputName="salaryInput"
              labelText="Input annual salary:"
              inputId="salary"
            />

            <InputBlock
                containerClass={`${s.inputBlock} ${s.paddedBlock}`}
                labelClass={s.label}
                inputName="hoursPerWeekInput"
                labelText="Input hours worked per week:"
                inputId="hoursPerWeek"
            />

            <InputBlock
                containerClass={`${s.inputBlock} ${s.paddedBlock}`}
                labelClass={s.label}
                inputName="averageLengthOfBreaksInput"
                labelText="Average length of each break (mins):"
                inputId="averageLengthOfBreaks"
            />

            <InputBlock
                containerClass={`${s.inputBlock} ${s.paddedBlock}`}
                labelClass={s.label}
                inputName="amountOfBreaksInput"
                labelText="Amount of breaks per week:"
                inputId="amountOfBreaks"
            />
            
            <button className={`${s.button} ${s.paddedBlock}`} id="submit">Submit</button>
          </div>
          
          <DisplayField
            containerClass={`${s.fieldWrapper}  ${s.paddedBlock}`}
            sharedClass={s.displayField}
            displayText={[
            `Salary: ${this.props.salary}`,
            `Hours per week: ${ this.props.hoursPerWeek }`,
            `Average length of breaks: ${ this.props.averageLengthOfBreaks }m`,
            `Amount of breaks: ${ this.props.amountOfBreaks } per week`
            ]}
          />

          <DisplayField
            containerClass={`${s.fieldWrapper} ${s.paddedBlock}`}
            sharedClass={s.displayField}
            displayText={[
            'Time on Toilet:',
            `Yearly: ${this.props.toiletTime.perYear}`,
            `Monthly: ${this.props.toiletTime.perMonth}`,
            `Weekly: ${this.props.toiletTime.perWeek}`
            ]}
            />
        </div>
    )
  }
}