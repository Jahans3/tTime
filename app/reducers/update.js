/**
 * Created by jahansj on 23/10/2016.
 */
import initialState from '../initialState';
import {
    _UPDATE_SALARY,
    _UPDATE_HOURS_PER_WEEK,
    _UPDATE_AVERAGE_LENGTH_OF_BREAKS,
    _UPDATE_AMOUNT_OF_BREAKS
} from '../actions/actionTypes';

export default (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  
  switch (action.type) {
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
  }
  
  return nextState;
}