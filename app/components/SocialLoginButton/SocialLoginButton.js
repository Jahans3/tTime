/**
 * Created by jahansj on 13/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

@connect((store) => {
  return { }
})
export default withRouter(class SocialLoginButton extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <a href={`http://localhost:3030/auth/${this.props.type.toLowerCase()}`}>
        { this.props.buttonText }
      </a>
    )
  }
});