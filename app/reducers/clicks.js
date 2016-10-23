/**
 * Created by jahansj on 23/10/2016.
 */
import initialState from '../initialState';

export default (state = initialState, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case 'CLICK_BUTTON':
      nextState.buttonClicked = !nextState.buttonClicked;
      break;
  }
  
  return nextState;
};