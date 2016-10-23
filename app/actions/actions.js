/**
 * Created by jahansj on 20/10/2016.
 */
import { _CLICK_BUTTON, _UPDATE_SALARY, _UPDATE_HOURS_PER_WEEK } from './actionTypes';

export const CLICK_TOGGLE = () => {
    return {
      type: _CLICK_BUTTON
    }
};

export const UPDATE_SALARY = (salary) => {
  return {
    type: _UPDATE_SALARY,
    payload: salary
  }
};

export const UPDATE_HOURS_PER_WEEK = (hoursPerWeek) => {
  return {
    type: _UPDATE_HOURS_PER_WEEK,
    payload: hoursPerWeek
  }
};