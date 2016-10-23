/**
 * Created by jahansj on 21/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { CLICK_TOGGLE, UPDATE_SALARY, UPDATE_HOURS_PER_WEEK } from '../../actions/actions';
import s from './App.css';

@connect((store) => {
  return {
    buttonClicked: store.clicks.buttonClicked,
    salary: store.update.salary,
    hoursPerWeek: store.update.hoursPerWeek
  }
})
export default class App extends Component {
  constructor(){
    super();
  }

  buttonClick() {
    store.dispatch((dispatcher) => {
      dispatcher(CLICK_TOGGLE());
    });
  }

  submitAll() {
    const salary = document.getElementById('salary').value;
    const hours = document.getElementById('hoursPerWeek').value;

    store.dispatch((dispatcher) => {
      dispatcher(UPDATE_SALARY(salary));
      dispatcher(UPDATE_HOURS_PER_WEEK(hours));
    });
  }

  componentDidMount() {
    document.getElementById('toggle').addEventListener('click', () => this.buttonClick());
    document.getElementById('submit').addEventListener('click', () => this.submitAll());
  }

  render() {
    let buttonText;
    
    if (this.props.buttonClicked) {
      buttonText = 'Clicked!';
    }
    else {
      buttonText = 'Not clicked.';
    }

    return (
        <div className={s.myClass}>
          <button id="toggle" className={s.button}>{ buttonText }</button>

          <input type="text" id="salary" />
          <input type="text" id="hoursPerWeek" />
          <button id="submit" className={s.button}>Submit</button>

          <span className={s.displayField}>{ this.props.salary }</span>
          <span className={s.displayField}>{ this.props.hoursPerWeek }</span>
        </div>
    )
  }
}