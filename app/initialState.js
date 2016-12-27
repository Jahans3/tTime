/**
 * Created by jahansj on 23/10/2016.
 */

/**
 * Entire application state tree
 */
export default {
  userStats: {
    salary: 0,
    typeOfBreaks: '',
    hoursPerWeek: 0,
    amountOfBreaks: 0,
    averageLengthOfBreaks: 0,
    time: {
      perYear: 0,
      perMonth: 0,
      perWeek: 0
    },
    pay: {
      perYear: 0,
      perMonth: 0,
      perWeek: 0
    }
  },
  login: {
    authInProgress: false,
    user: {
      forename: null,
      surname: null,
      email: null
    },
    authenticated: false,
    failedLogin: false
  },
  errors: []
}