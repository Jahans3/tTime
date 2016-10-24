/**
 * Created by jahansj on 21/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { DisplayField, InputBlock } from '../../sub-components/subcomponents';
import s from './App.css';
import {
    CLICK_TOGGLE,
    UPDATE_SALARY,
    UPDATE_HOURS_PER_WEEK,
    UPDATE_AMOUNT_OF_BREAKS,
    UPDATE_AVERAGE_LENGTH_OF_BREAKS
} from '../../actions/actions';

/**
 * App
 * Root component
 */
@connect((store) => {
  return {
    buttonClicked: store.clicks.buttonClicked,
    salary: store.update.salary,
    hoursPerWeek: store.update.hoursPerWeek,
    averageLengthOfBreaks: store.update.averageLengthOfBreaks,
    amountOfBreaks: store.update.amountOfBreaks
  }
})
export default class App extends Component {
  constructor(){
    super();
  }

  buttonClick() {
    store.dispatch((dispatcher) => dispatcher(CLICK_TOGGLE()));
  }

  submitAll() {
    const salary = document.getElementById('salary').value;
    const hours = document.getElementById('hoursPerWeek').value;
    const length = document.getElementById('averageLengthOfBreaks').value;
    const amount = document.getElementById('amountOfBreaks').value;

    // This must be moved to more suitable location in accordance with Redux - reducer?
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
    document.getElementById('toggle').addEventListener('click', () => this.buttonClick());
    document.getElementById('submit').addEventListener('click', () => this.submitAll());
    
    socket.on('another', (socket) => console.log('another sock: ' + socket));
  }

  render() {
    let buttonText;
    
    if (this.props.buttonClicked) {
      buttonText = 'Redux!';
    }
    else {
      buttonText = 'Redux.';
    }

    return (
        <div className={s.container}>
          <h1 className={s.title}>Toilet Time</h1>
          
          <button id="toggle" className={`${s.button} ${s.paddedBlock}`}>{ buttonText }</button>

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
        </div>
    )
  }
}