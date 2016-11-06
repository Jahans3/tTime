/**
 * Created by jahansj on 21/10/2016.
 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store';
import LoginPanel from '../LoginPanel/LoginPanel';
import { DisplayField } from '../../sub-components/subcomponents';
import {
    UPDATE_ERROR,
    UPDATE_TOILET_TIME_PER_YEAR,
    UPDATE_TOILET_TIME_PER_MONTH,
    UPDATE_TOILET_TIME_PER_WEEK,
    UPDATE_TOILET_PAY_PER_YEAR,
    UPDATE_TOILET_PAY_PER_MONTH,
    UPDATE_TOILET_PAY_PER_WEEK
} from '../../actions/updateActions';
import d from '../defaults.css';
import s from './App.css';

/**
 * App
 * Root component
 */
@connect((store) => {
  return {
    login: {
      authenticated: store.login.login.authenticated,
      user: store.login.login.user
    }
  }
})
export default withRouter(class App extends Component {
  constructor(){
    super();
  }

  componentDidMount() {
    socket.on('calculated', (sock) => this.calculate(sock));
  }
  
  /**
   * Update state on calculate event
   * @param socket
   * @returns {Promise.<TResult>|Promise}
   */
  calculate(socket) {
    return new Promise((resolve, reject) => {
      const type = typeof socket;

      switch (type) {
        case 'object':
          return resolve (socket);

        case 'string':
          return resolve(JSON.parse(socket));

        default:
          return reject(console.warn(`App: Event: Calculate: Expected to receive object or string, got ${type} instead`));
      }
    }).then((val) => {
      store.dispatch(UPDATE_TOILET_TIME_PER_YEAR(val.timePerYear));
      store.dispatch(UPDATE_TOILET_TIME_PER_MONTH(val.timePerMonth));
      store.dispatch(UPDATE_TOILET_TIME_PER_WEEK(val.timePerWeek));
      store.dispatch(UPDATE_TOILET_PAY_PER_YEAR(val.payPerYear));
      store.dispatch(UPDATE_TOILET_PAY_PER_MONTH(val.payPerMonth));
      store.dispatch(UPDATE_TOILET_PAY_PER_WEEK(val.payPerWeek));

    }).catch((err) => {
      store.dispatch(UPDATE_ERROR(err));
    });
  }

  render() {
    let nav;
    let content = this.props.children;

    if (this.props.login.authenticated) {
      nav = [ 
        <DisplayField
                containerClass={`${d.fieldWrapper}  ${d.paddedBlock}`}
                sharedClass={`${d.displayField}`}
                displayText={[
                  `Welcome ${this.props.login.user}`
                ]}
                />,
        <Link to="authenticated/display" key="1"> Display </Link>, 
        <Link to="authenticated/input" key="2"> Input </Link>
      ];
    } else {
      content = <LoginPanel />;
    }

    return (
        <div className={d.container}>
          <h1 className={d.title}>_ Time</h1>
          {
              nav
          }
          {
              content
          }
        </div>
    )
  }
});