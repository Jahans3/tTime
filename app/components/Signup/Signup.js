/**
 * Created by jahansj on 01/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import {
    LOGIN_CREDENTIALS_REQUEST,
    LOGIN_CREDENTIALS_FAILURE,
    LOGIN_CREDENTIALS_SUCCESS
} from '../../actions/loginActions';
import LoginPanel from '../LoginPanel/LoginPanel';
import s from '../defaults.css';
import ls from './Signup.css';

@connect((store) => {
  return {
    
  }
})
export default class Signup extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
        <div>
          
        </div>
    )
  }
}