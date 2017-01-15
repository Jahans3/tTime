/**
 * Created by jahansj on 05/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return { }
})
export default class ActionPanel extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div>
        {
          this.props.children
        }
      </div>
    )
  }
}