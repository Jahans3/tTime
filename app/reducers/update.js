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
    _UPDATE_TOILET_TIME_PER_WEEK
} from '../actions/actionTypes';

export default (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  
  switch (action.type) {
    case _UPDATE_ERROR:
      nextState.errors.push('err_update');
      break;
    
    case _UPDATE_SALARY:
      nextState.salary = action.payload;
      break;
    
    case _UPDATE_HOURS_PER_WEEK:
      nextState.hoursPerWeek = action.payload;
      break;
    
    case _UPDATE_AVERAGE_LENGTH_OF_BREAKS:
      nextState.averageLengthOfBreaks = action.payload;
      break;
    
    case _UPDATE_AMOUNT_OF_BREAKS:
      nextState.amountOfBreaks = action.payload;
      break;
    
    case _UPDATE_TOILET_TIME_PER_YEAR:
      nextState.toiletTime.perYear = action.payload;
      break;
    
    case _UPDATE_TOILET_TIME_PER_MONTH:
      nextState.toiletTime.perMonth = action.payload;
      break;
    
    case _UPDATE_TOILET_TIME_PER_WEEK:
      nextState.toiletTime.perWeek = action.payload;
      break;
  }
  
  return nextState;
}