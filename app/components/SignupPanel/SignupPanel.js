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
import DataHelper from '../../helpers/DataHelper';
import { InputBlock, DisplayField } from '../../sub-components/subcomponents';

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
            store.dispatch(LOGIN_CREDENTIALS_FAILURE(err));
          });
    });
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

    const parsed = DataHelper.parseFormData(
        email, confirmEmail, password, confirmPassword, 
        forename, surname, age, company, city, 
        country, jobTitle, department, industry
    );
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', encodeURI('http://localhost:3030/auth/signup'));
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        
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
                displayText={[
                  `Account details`
                ]}
            />

            <InputBlock
                inputName="emailInput"
                labelText="Email:"
                inputId="emailInput"
            />

            <InputBlock
                inputName="confirmEmailInput"
                labelText="Confirm email:"
                inputId="confirmEmailInput"
            />

            <InputBlock
                inputName="passwordInput"
                labelText="Password:"
                inputId="passwordInput"
            />

            <InputBlock
                inputName="confirmPasswordInput"
                labelText="Confirm password:"
                inputId="confirmPasswordInput"
            />

            <DisplayField
                displayText={[
                  `User details`
                ]}
            />

            <InputBlock
                inputName="forenameInput"
                labelText="Forename:"
                inputId="forenameInput"
            />

            <InputBlock
                inputName="surenameInput"
                labelText="Surname:"
                inputId="surenameInput"
            />

            <InputBlock
                inputName="ageInput"
                labelText="Age:"
                inputId="ageInput"
            />

            <InputBlock
                inputName="companyInput"
                labelText="Company:"
                inputId="companyInput"
            />

            <InputBlock
                inputName="cityInput"
                labelText="City:"
                inputId="cityInput"
            />

            <InputBlock
                inputName="countryInput"
                labelText="Country:"
                inputId="countryInput"
            />

            <DisplayField
                displayText={[
                  `Job details`
                ]}
            />

            <InputBlock
                inputName="jobTitleInput"
                labelText="Job title:"
                inputId="jobTitleInput"
            />

            <InputBlock
                inputName="departmentInput"
                labelText="Department:"
                inputId="departmentInput"
            />

            <InputBlock
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