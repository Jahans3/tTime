/**
 * Created by jahansj on 23/10/2016.
 */

/**
 * Entire application state tree
 */
export default {
  userStats: {
    salary: 0,
    hoursPerWeek: 0,
    amountOfBreaks: 0,
    averageLengthOfBreaks: 0,
    toiletTime: {
      perYear: 0,
      perMonth: 0,
      perWeek: 0
    },
    toiletPay: {
      perYear: 0,
      perMonth: 0,
      perWeek: 0
    }
  },
  login: {
    authInProgress: false,
    user: null,
    authenticated: false
  },
  errors: []
}