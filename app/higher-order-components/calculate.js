/**
 * Created by jahansj on 06/11/2016.
 */
import store from '../store';
import {
    UPDATE_ERROR,
    UPDATE_TOILET_TIME_PER_YEAR,
    UPDATE_TOILET_TIME_PER_MONTH,
    UPDATE_TOILET_TIME_PER_WEEK,
    UPDATE_TOILET_PAY_PER_YEAR,
    UPDATE_TOILET_PAY_PER_MONTH,
    UPDATE_TOILET_PAY_PER_WEEK
} from '../actions/updateActions';

export default (target) => {

  /**
   * Update state on calculate event
   * @param socket
   * @returns {Promise.<TResult>|Promise}
   */
  target.calculate = (socket) => {
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
}