/**
 * Created by jahansj on 06/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import store from '../../store';
import { CHANGE_APP_DRAWER_STATUS } from '../../actions/appActions';
import SocialLoginButton from '../SocialLoginButton/SocialLoginButton';
import { DisplayField, Drawer, LogoutButton } from '../../sub-components/subcomponents';
import s from './Header.css';

@connect((store) => {
  return {
    login: {
      user: {
        forename: store.login.login.user.forename,
        email: store.login.login.user.email
      },
      authenticated: store.login.login.authenticated
    },
    app: {
      header: {
        drawer: store.app.app.header.drawer
      }
    }
  }
})
export default withRouter(class Header extends Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.login.authenticated) {
      this.menuItems = [
        <Link to="authenticated/input" key="2"> Input </Link>,
        <Link to="authenticated/display" key="3"> Display </Link>,
        <Link to="authenticated/account" key="4"> { this.props.login.user.forename || this.props.login.user.email } </Link>,
        <LogoutButton />
      ];

      this.accountLink = (
          <Link to="authenticated/account">
            <i className={ `fa fa-user-circle-o ${ s.icon }`} />
          </Link>
      );
    } else {
      this.menuItems = [
        <Link to="login" key="1"> Login </Link>,
        <Link to="signup" key="2"> Signup </Link>,
        <SocialLoginButton
            buttonText="Login with Facebook"
            type="facebook"
        />
      ];

      this.accountLink = <i className={ `fa fa-user-circle-o ${ s.icon } ${ s.iconInactive }`} />;
    }

    return (
        <div className={ s.container }>
          <div className={ s.header }>
            <div className={ `${ s.drawerIconWrapper } ${ s.iconWrapper }` } onClick={ () => store.dispatch(CHANGE_APP_DRAWER_STATUS()) }>
              <i className={ `fa fa-bars fa-6 ${ s.icon }` } />
            </div>

            <div className={s.title }>
              <h1>_ Time</h1>
            </div>

            <div className={ `${ s.accountIconWrapper } ${ s.iconWrapper }` }>
              {
                  this.accountLink
              }
            </div>
          </div>

          <Drawer 
              items={ this.menuItems }
              wrapperClass={ s.drawer }
              listClass={ s.drawerList }
              listItemClass={ s.drawerListItem }
              isActive={ this.props.app.header.drawer }
              activeClass={ s.drawerActive }
          />
        </div>
    )
  }
});