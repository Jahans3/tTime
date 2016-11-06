/**
 * Created by jahansj on 05/11/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import DisplayStats from '../DisplayStats/DisplayStats';
import UserdataInput from '../UserdataInput/UserdataInput';
import d from '../defaults.css';
import s from './ActionPanel.css';

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