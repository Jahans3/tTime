/**
 * Created by jahansj on 23/10/2016.
 */

/**
 * Entire application state tree
 */
export default {
  buttonClicked: false,
  salary: 0,
  hoursPerWeek: 0,
  averageLengthOfBreaks: 0,
  amountOfBreaks: 0,
  toiletTime: {
    perYear: 0,
    perBreak: 0
  },
  login: {
    authInProgress: false,
    user: null,
    authenticated: false
  }
}