/**
 * Created by jahansj on 21/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { CLICK } from '../../actions/actions';
import s from './AppStyles.css';

@connect((store) => {
  return {
    buttonClicked: store.clicks.buttonClicked
  }
})
export default class App extends Component {
  constructor(){
    super();
  }

  buttonClick() {
    store.dispatch((dispatcher) => {
      dispatcher(CLICK());
    });
  }

  componentDidMount() {
    document.querySelector('.myButton').addEventListener('click', () => this.buttonClick());
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
        <div className={s.myClass} style={{
          marginLeft: `${250}px`
        }}>
          <button className="myButton">{ buttonText }</button>
        </div>
    )
  }
}