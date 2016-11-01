/**
 * Created by jahansj on 23/10/2016.
 */
import initialState from '../initialState';
import {
    _UPDATE_ERROR,
    _UPDATE_SALARY,
    _UPDATE_HOURS_PER_WEEK,
    _UPDATE_AVERAGE_LENGTH_OF_BREAKS,
    _UPDATE_AMOUNT_OF_BREAKS,
    _UPDATE_TOILET_TIME_PER_YEAR,
    _UPDATE_TOILET_TIME_PER_MONTH,
    _UPDATE_TOILET_TIME_PER_WEEK,
    _UPDATE_TOILET_PAY_PER_YEAR,
    _UPDATE_TOILET_PAY_PER_MONTH,
    _UPDATE_TOILET_PAY_PER_WEEK
} from '../actions/actionTypes';

export default (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  
  switch (action.type) {
    case _UPDATE_ERROR:
      nextState.errors.push('err_update');
      break;
    
    case _UPDATE_SALARY:
      nextState.userStats.salary = action.payload;
      break;
    
    case _UPDATE_HOURS_PER_WEEK:
      nextState.userStats.hoursPerWeek = action.payload;
      break;
    
    case _UPDATE_AVERAGE_LENGTH_OF_BREAKS:
      nextState.userStats.averageLengthOfBreaks = action.payload;
      break;
    
    case _UPDATE_AMOUNT_OF_BREAKS:
      nextState.userStats.amountOfBreaks = action.payload;
      break;
    
    case _UPDATE_TOILET_TIME_PER_YEAR:
      nextState.userStats.toiletTime.perYear = action.payload;
      break;
    
    case _UPDATE_TOILET_TIME_PER_MONTH:
      nextState.userStats.toiletTime.perMonth = action.payload;
      break;
    
    case _UPDATE_TOILET_TIME_PER_WEEK:
      nextState.userStats.toiletTime.perWeek = action.payload;
      break;
    
    case _UPDATE_TOILET_PAY_PER_YEAR:
      nextState.userStats.toiletPay.perYear = action.payload;
      break;
    
    case _UPDATE_TOILET_PAY_PER_MONTH:
      nextState.userStats.toiletPay.perMonth = action.payload;
      break;
    
    case _UPDATE_TOILET_PAY_PER_WEEK:
      nextState.userStats.toiletPay.perWeek = action.payload;
      break;
  }
  
  return nextState;
}