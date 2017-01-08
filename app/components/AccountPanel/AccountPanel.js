/**
 * Created by jahansj on 13/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store from '../../store';
import { DisplayField } from '../../sub-components/subcomponents';
import { LOGOUT, LOGOUT_ERROR } from '../../actions/loginActions';

@connect((store) => {
  return {
    userStats: {
      typeOfBreaks: store.update.userStats.typeOfBreaks,
      time: {
        perYear: store.update.userStats.time.perYear
      },
      pay: {
        perYear: store.update.userStats.pay.perYear
      }
    },
    login: {
      user: {
        forename: store.login.login.user.forename,
        surname: store.login.login.user.surname,
        email: store.login.login.user.email
      }
    }
  }
})
export default withRouter(class AccountPanel extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    document.querySelector('.fb_deauth').addEventListener('click', () => this.deAuthFacebook());
  }

  deAuthFacebook() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', encodeURI('/auth/deauth/facebook'));
      xhr.setRequestHeader('Content-Type', 'text/plain');
      
      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr.statusText);
        }
        
        resolve();
      };

      xhr.send();
    }).then(() => {
      store.dispatch(LOGOUT());
      this.props.router.replace('/');
    }).catch((err) => {
      store.dispatch(LOGOUT_ERROR(err));
    });
  }
  
  render() {
    return (
      <div>
        <h1>Welcome, { this.props.login.user.forename || this.props.login.user.email }</h1>

        <DisplayField
          displayText={[
            `Account details`,
            `Email: ${ this.props.login.user.email }`,
            `Name: ${ this.props.login.user.forename } ${ this.props.login.user.surname }`,
            `Annual ${ this.props.userStats.typeOfBreaks } break time: ${ this.props.userStats.time.perYear }hrs`,
            `Annual ${ this.props.userStats.typeOfBreaks } break pay: £${ this.props.userStats.pay.perYear }`
          ]}
        />
        
        <button className="fb_deauth">De-Auth Facebook</button>
        
      </div>
    )
  }
})