/**
 * Created by jahansj on 02/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store from '../../store';
import {
  UPDATE_SALARY,
  UPDATE_TYPE_OF_BREAKS,
  UPDATE_HOURS_PER_WEEK,
  UPDATE_AMOUNT_OF_BREAKS,
  UPDATE_AVERAGE_LENGTH_OF_BREAKS,
} from '../../actions/updateActions';
import { InputBlock } from '../../sub-components/subcomponents';

@connect((store) => {
  return {
    userStats: {
      salary: store.update.userStats.salary,
      hoursPerWeek: store.update.userStats.hoursPerWeek,
      averageLengthOfBreaks: store.update.userStats.averageLengthOfBreaks,
      amountOfBreaks: store.update.userStats.amountOfBreaks
    }
  }
})
export default withRouter(class UserdataInput extends Component {
  constructor() {
    super();
  }

  submitAll() {
    const salary = document.getElementById('salary').value;
    const breaks = document.getElementById('typeOfBreaks').value;
    const hours = document.getElementById('hoursPerWeek').value;
    const length = document.getElementById('averageLengthOfBreaks').value;
    const amount = document.getElementById('amountOfBreaks').value;

    // do some client-side validation

    socket.emit('calculate', {
      pay: salary,
      typeOfBreaks: breaks,
      hoursPerWeek: hours,
      lengthOfBreaks: length,
      breaksPerWeek: amount
    });

    store.dispatch((dispatcher) => {
      dispatcher(UPDATE_SALARY(salary));
      dispatcher(UPDATE_TYPE_OF_BREAKS(breaks));
      dispatcher(UPDATE_HOURS_PER_WEEK(hours));
      dispatcher(UPDATE_AVERAGE_LENGTH_OF_BREAKS(length));
      dispatcher(UPDATE_AMOUNT_OF_BREAKS(amount));
    });
    
    this.props.router.replace('authenticated/display');
  }

  componentDidMount() {
    document.getElementById('submit').addEventListener('click', () => this.submitAll());
  }
  
  render() {
    return (
      <div>

        <InputBlock
          inputName="salaryInput"
          labelText="Input annual salary:"
          inputId="salary"
        />
          
        <InputBlock
          inputName="typeOfBreaksInput"
          labelText="Input type of break (coffee, toilet, etc.):"
          inputId="typeOfBreaks"
        />

        <InputBlock
          inputName="hoursPerWeekInput"
          labelText="Input hours worked per week:"
          inputId="hoursPerWeek"
        />

        <InputBlock
          inputName="averageLengthOfBreaksInput"
          labelText="Average length of each break (mins):"
          inputId="averageLengthOfBreaks"
        />

        <InputBlock
          inputName="amountOfBreaksInput"
          labelText="Amount of breaks per week:"
          inputId="amountOfBreaks"
        />

        <button id="submit">Submit</button>
      </div>
    )
  }
});