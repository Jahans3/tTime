/**
 * Created by jahansj on 21/10/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import DisplayStats from '../DisplayStats/DisplayStats';
import UserdataInput from '../UserdataInput/UserdataInput';
import LoginPanel from '../LoginPanel/LoginPanel';
import d from '../defaults.css';

/**
 * App
 * Root component
 */
@connect((store) => {
  return { }
})
export default class App extends Component {
  constructor(){
    super();
  }

  render() {
    return (
        <div className={d.container}>
          <h1 className={d.title}>Toilet Time</h1>

          <LoginPanel />

          <UserdataInput />

          <DisplayStats />
        </div>
    )
  }
}