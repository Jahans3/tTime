/**
 * Created by jahansj on 06/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import store from '../../store';
import { CHANGE_APP_DRAWER_STATUS } from '../../actions/appActions';
import SocialLoginButton from '../SocialLoginButton/SocialLoginButton';
import { DisplayField, Drawer, LogoutButton, MenuItem } from '../../sub-components/subcomponents';
import s from './Header.scss';

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
        <MenuItem to="authenticated/input" keyNum="2"> Input </MenuItem>,
        <MenuItem to="authenticated/display" keyNum="3"> Display </MenuItem>,
        <MenuItem to="authenticated/account" keyNum="4"> { this.props.login.user.forename || this.props.login.user.email } </MenuItem>,
        <LogoutButton />
      ];

      this.accountLink = (
        <MenuItem to="authenticated/account" noDrawer={ true }>
          <i className={ `fa fa-user-circle-o ${ s.icon }`} />
        </MenuItem>
      );
    } else {
      this.menuItems = [
        <MenuItem to="login" keyNum="1"> Login </MenuItem>,
        <MenuItem to="signup" keyNum="2"> Signup </MenuItem>,
        <SocialLoginButton
          buttonText="Login with Facebook"
          type="facebook"
        />
      ];

      this.accountLink = <i className={ `fa fa-user-circle-o ${ s.icon } ${ s.iconInactive }` } />;
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
          activeClass={ s.drawerActive }
        />
      </div>
    )
  }
});