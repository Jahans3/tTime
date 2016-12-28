/**
 * Created by jahansj on 21/10/2016.
 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store';
import { 
    LOGIN_CREDENTIALS_REQUEST,
    LOGIN_CREDENTIALS_SUCCESS,
    LOGIN_CREDENTIALS_FAILURE
} from '../../actions/loginActions';
import DataHelper from '../../helpers/DataHelper';
import Header from '../Header/Header';
import d from '../defaults.css';

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
    this.checkFacebookLogin();
    
    socket.on('calculated', DataHelper.calculate);

    socket.on('returnFacebookUserData', sock => {
      DataHelper.loginFacebookUser(sock, this.props.router.replace);
    });
  }

  // TODO - move method to better class?
  checkFacebookLogin() {
    // TODO - sanitise facebookProfileId
    const facebookProfileId = DataHelper.getUrlParam('facebookId');


    if (facebookProfileId) {
      store.dispatch(LOGIN_CREDENTIALS_REQUEST());

      socket.emit('getFacebookUserData', facebookProfileId);
    }
  }

  render() {
    return (
        <div className={d.container}>
          <Header />
          
          {
              this.props.children
          }
        </div>
    )
  }
});