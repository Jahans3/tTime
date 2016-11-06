/**
 * Created by jahansj on 01/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store from '../../store';
import {
    LOGIN_CREDENTIALS_REQUEST,
    LOGIN_CREDENTIALS_FAILURE,
    LOGIN_CREDENTIALS_SUCCESS
} from '../../actions/loginActions';
import LoginPanel from '../LoginPanel/LoginPanel';
import { InputBlock } from '../../sub-components/subcomponents';
import d from '../defaults.css';
import s from './SignupPanel.css';

@connect((store) => {
  return {
    
  }
})
export default withRouter(class Signup extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
        <div className="">
          <form>
            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="usernameInput"
                labelText="Username:"
                inputId="usernameInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="passwordInput"
                labelText="Password:"
                inputId="passwordInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="someInput"
                labelText="Some input:"
                inputId="someInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName=""
                labelText=""
                inputId=""
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName=""
                labelText=""
                inputId=""
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName=""
                labelText=""
                inputId=""
            />

          </form>
        </div>
    )
  }
});