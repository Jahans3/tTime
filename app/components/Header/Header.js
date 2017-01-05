/**
 * Created by jahansj on 06/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import store from '../../store';
import SocialLoginButton from '../SocialLoginButton/SocialLoginButton';
import { DisplayField, Drawer } from '../../sub-components/subcomponents';
import s from './Header.css';

@connect((store) => {
  return {
    login: {
      user: {
        forename: store.login.login.user.forename,
        email: store.login.login.user.email
      },
      authenticated: store.login.login.authenticated
    }
  }
})
export default withRouter(class Header extends Component {
  constructor() {
    super();
  }

  showDrawer() {
    const drawer = document.querySelector(`.${ s.drawer }`);
    const isActive = document.querySelector(`.${ s.drawer }.${ s.drawerActive }`);

    if (isActive) {
      drawer.classList.remove(s.drawerActive);
    } else {
      drawer.classList.add(s.drawerActive);
    }
  }

  render() {
    if (this.props.login.authenticated) {
      this.menuItems = [
        <Link to="authenticated/input" key="2"> Input </Link>,
        <Link to="authenticated/display" key="3"> Display </Link>,
        <Link to="authenticated/account" key="4"> { this.props.login.user.forename || this.props.login.user.email } </Link>
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
            <div className={ `${ s.drawerIconWrapper } ${ s.iconWrapper }` } onClick={ () => this.showDrawer() }>
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
          />
        </div>
    )
  }
});