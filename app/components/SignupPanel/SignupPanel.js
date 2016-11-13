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
  
  componentDidMount() {
    document.getElementById('signup-submit').addEventListener('click', e => {
      e.preventDefault();

      this.submitSignup()
          .then((val) => {
            store.dispatch(LOGIN_CREDENTIALS_SUCCESS(val));
            this.props.router.replace('authenticated');
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
            store.dispatch(LOGIN_CREDENTIALS_FAILURE());
          });
    });
  }

  parseFormData() {
    const args = arguments;
    let body;

    for (let i = 0, length = args.length; i < length; i++) {
      const argExists = args[i].split('=')[1].length >= 1;
      if (argExists) {
        body = `${body ? `${body}&` : ''}${args[i]}`;
      }
    }

    return body;
  }
  
  submitSignup() {
    const email = `email=${document.getElementById('emailInput').value}`;
    const confirmEmail = `confirmEmail=${document.getElementById('confirmEmailInput').value}`;
    const password = `password=${document.getElementById('passwordInput').value}`;
    const confirmPassword = `confirmPassword=${document.getElementById('confirmPasswordInput').value}`;
    const forename = `forename=${document.getElementById('forenameInput').value}`;
    const surname = `surname=${document.getElementById('surenameInput').value}`;
    const age = `age=${document.getElementById('ageInput').value}`;
    const company = `company=${document.getElementById('companyInput').value}`;
    const city = `city=${document.getElementById('cityInput').value}`;
    const country = `country=${document.getElementById('countryInput').value}`;
    const jobTitle = `jobTitle=${document.getElementById('jobTitleInput').value}`;
    const department = `department=${document.getElementById('departmentInput').value}`;
    const industry = `industry=${document.getElementById('industryInput').value}`;

    // Do some validation

    const parsed = this.parseFormData(
        email, confirmEmail, password, confirmPassword, 
        forename, surname, age, company, city, 
        country, jobTitle, department, industry
    );
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', encodeURI('http://localhost:3030/auth/signup'));
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onload = () => {
        const res = xhr.response;
        
        if (!res || xhr.status !== 200) {
          reject(xhr.statusText);
        }
        
        resolve(res);
      };

      store.dispatch(LOGIN_CREDENTIALS_REQUEST());
      xhr.send(parsed);
    });
  }
  
  render() {
    return (
        <div className="SignupPanel">
          <form action="http://localhost:3030/signup" method="post">
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
            <button id="signup-submit" type="submit">Submit</button>
          </form>
        </div>
    )
  }
});