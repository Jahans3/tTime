/**
 * Created by jahansj on 23/10/2016.
 */
import initialState from '../initialState';

export default (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  
  switch (action.type) {
    case 'UPDATE_SALARY':
      nextState.salary = action.payload;
      break;
    
    case 'UPDATE_HOURS_PER_WEEK':
      nextState.hoursPerWeek = action.payload;
      break;
    
    case 'UPDATE_AVERAGE_LENGTH_OF_BREAKS':
      nextState.averageLengthOfBreaks = action.payload;
      break;
    
    case 'UPDATE_AMOUNT_OF_BREAKS':
      nextState.amountOfBreaks = action.payload;
      break;
  }
  
  return nextState;
}