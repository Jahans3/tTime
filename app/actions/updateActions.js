/**
 * Created by jahansj on 27/10/2016.
 */
import {
    _UPDATE_ERROR,
    _UPDATE_SALARY,
    _UPDATE_HOURS_PER_WEEK,
    _UPDATE_AVERAGE_LENGTH_OF_BREAKS,
    _UPDATE_AMOUNT_OF_BREAKS,
    _UPDATE_TOILET_TIME_PER_YEAR,
    _UPDATE_TOILET_TIME_PER_MONTH,
    _UPDATE_TOILET_TIME_PER_WEEK
} from './actionTypes';

export const UPDATE_ERROR = (error) => {
  return {
    type: _UPDATE_ERROR,
    payload: error
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

export const UPDATE_AVERAGE_LENGTH_OF_BREAKS = (averageLengthOfBreaks) => {
  return {
    type: _UPDATE_AVERAGE_LENGTH_OF_BREAKS,
    payload: averageLengthOfBreaks
  }
};

export const UPDATE_AMOUNT_OF_BREAKS = (amountOfBreaks) => {
  return {
    type: _UPDATE_AMOUNT_OF_BREAKS,
    payload: amountOfBreaks
  }
};

export const UPDATE_TOILET_TIME_PER_YEAR = (timePerYear) => {
  return {
    type: _UPDATE_TOILET_TIME_PER_YEAR,
    payload: timePerYear
  }
};

export const UPDATE_TOILET_TIME_PER_MONTH = (timePerMonth) => {
  return {
    type: _UPDATE_TOILET_TIME_PER_MONTH,
    payload: timePerMonth
  }
};

export const UPDATE_TOILET_TIME_PER_WEEK = (timePerWeek) => {
  return {
    type: _UPDATE_TOILET_TIME_PER_WEEK,
    payload: timePerWeek
  }
};