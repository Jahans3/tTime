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
import { InputBlock, DisplayField } from '../../sub-components/subcomponents';
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
            <DisplayField
                containerClass={`${d.fieldWrapper} ${d.paddedBlock}`}
                sharedClass={d.displayField}
                displayText={[
                  `Account details`
                ]}
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="emailInput"
                labelText="Email:"
                inputId="emailInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="confirmEmailInput"
                labelText="Confirm email:"
                inputId="confirmEmailInput"
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
                inputName="confirmPasswordInput"
                labelText="Confirm password:"
                inputId="confirmPasswordInput"
            />

            <DisplayField
                containerClass={`${d.fieldWrapper} ${d.paddedBlock}`}
                sharedClass={d.displayField}
                displayText={[
                  `User details`
                ]}
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="forenameInput"
                labelText="Forename:"
                inputId="forenameInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="surenameInput"
                labelText="Surname:"
                inputId="surenameInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="ageInput"
                labelText="Age:"
                inputId="ageInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="companyInput"
                labelText="Company:"
                inputId="companyInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="cityInput"
                labelText="City:"
                inputId="cityInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="countryInput"
                labelText="Country:"
                inputId="countryInput"
            />

            <DisplayField
                containerClass={`${d.fieldWrapper} ${d.paddedBlock}`}
                sharedClass={d.displayField}
                displayText={[
                  `Job details`
                ]}
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="jobTitleInput"
                labelText="Job title:"
                inputId="jobTitleInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="departmentInput"
                labelText="Department:"
                inputId="departmentInput"
            />

            <InputBlock
                containerClass={`${d.inputBlock} ${d.paddedBlock}`}
                labelClass={d.label}
                inputName="industryInput"
                labelText="Industry:"
                inputId="industryInput"
            />

          </form>
        </div>
    )
  }
});