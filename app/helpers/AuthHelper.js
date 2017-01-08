/**
 * Created by joshjahans on 1/7/2017.
 */
import store from '../store';
import {
  LOGIN_CREDENTIALS_FAILURE,
  LOGIN_CREDENTIALS_SUCCESS
} from '../actions/loginActions';

export default class {

  /**
   * Check if a user is authorised before entering protected routes, otherwise redirect to login page
   * @param nextState
   * @param replace
   */
  static checkAuth(nextState, replace) {
    const state = store.getState();
    const authenticated = state.login.login.authenticated;

    if (!authenticated) {
      replace({
        pathname: '/login',
        state: nextState.location.pathname
      });
    }
  }

  /**
   * Login a facebook user and dispatch some user info
   * @param user
   * @param replace
   * @returns {Promise.<TResult>|Promise}
   */
  static loginFacebookUser(user, replace) {
    return new Promise((resolve) => {
      if (typeof user === 'string') {
        user = JSON.parse(user);
      }

      const forename = user.value.auth.facebook.forename;
      const surname = user.value.auth.facebook.surname;
      const email = user.value.auth.local.email;

      resolve({
        forename,
        surname,
        email
      });
    }).then((val) => {
      store.dispatch(LOGIN_CREDENTIALS_SUCCESS(val));
      replace('authenticated/account');

    }).catch((err) => {
      console.log(err);
      store.dispatch(LOGIN_CREDENTIALS_FAILURE(err))
    });
  }
}