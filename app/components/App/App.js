/**
 * Created by jahansj on 21/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import DisplayStats from '../DisplayStats/DisplayStats';
import { DisplayField, InputBlock } from '../../sub-components/subcomponents';
import d from '../defaults.css';
import {
    UPDATE_SALARY,
    UPDATE_HOURS_PER_WEEK,
    UPDATE_AMOUNT_OF_BREAKS,
    UPDATE_AVERAGE_LENGTH_OF_BREAKS,
} from '../../actions/updateActions';

/**
 * App
 * Root component
 */
@connect((store) => {
  return {
    userStats: {
      salary: store.update.userStats.salary,
      hoursPerWeek: store.update.userStats.hoursPerWeek,
      averageLengthOfBreaks: store.update.userStats.averageLengthOfBreaks,
      amountOfBreaks: store.update.userStats.amountOfBreaks
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
  }

  render() {
    return (
        <div className={d.container}>
          <h1 className={d.title}>Toilet Time</h1>
          
          <div className={d.fieldWrapper}>
            
            <InputBlock
              containerClass={`${d.inputBlock} ${d.paddedBlock}`}
              labelClass={d.label}
              inputName="salaryInput"
              labelText="Input annual salary:"
              inputId="salary"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="hoursPerWeekInput"
                labelText="Input hours worked per week:"
                inputId="hoursPerWeek"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="averageLengthOfBreaksInput"
                labelText="Average length of each break (mins):"
                inputId="averageLengthOfBreaks"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="amountOfBreaksInput"
                labelText="Amount of breaks per week:"
                inputId="amountOfBreaks"
            />
            
            <button className={`${d.button} ${d.paddedBlock}`} id="submit">Submit</button>
          </div>

          <DisplayStats />
        </div>
    )
  }
}