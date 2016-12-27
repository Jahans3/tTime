/**
 * Created by jahansj on 22/12/2016.
 */
import store from '../store';
import {
    UPDATE_ERROR,
    UPDATE_TOILET_TIME_PER_YEAR,
    UPDATE_TOILET_TIME_PER_MONTH,
    UPDATE_TOILET_TIME_PER_WEEK,
    UPDATE_TOILET_PAY_PER_YEAR,
    UPDATE_TOILET_PAY_PER_MONTH,
    UPDATE_TOILET_PAY_PER_WEEK,
} from '../actions/updateActions';
import {
    LOGIN_CREDENTIALS_FAILURE,
    LOGIN_CREDENTIALS_SUCCESS
} from '../actions/loginActions';

export default class {

  /**
   * getUrlParam
   * @param name
   * @param url
   * @returns {*}
   */
  static getUrlParam(name, url) {
    if (!url) {
      url = window.location.href;
    }

    name = name.replace(/[\[\]]/g, "\\$&");

    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`).exec(url);

    if (!regex) {
      return null;
    }

    if (!regex[2]) {
      return '';
    }

    return decodeURIComponent(regex[2].replace(/\+/g, " "));
  }

  /**
   * Update state on calculate event
   * @param socket
   * @returns {Promise.<TResult>|Promise}
   */
  static calculate(socket) {
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
  
  static loginFacebookUser(user) {
    return new Promise((resolve, reject) => {
      if (typeof user === 'string') {
        user = JSON.parse(user);
      }

      const displayName = user.value.auth.facebook.displayName.split(' ');
      const forename = displayName[0];
      const surname = displayName[2] || displayName[1];
      const email = user.value.auth.local.email;

      resolve({ forename, surname, email });
    });
  }
}