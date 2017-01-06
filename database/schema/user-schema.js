/**
 * Created by jahansj on 31/10/2016.
 */
const Schema = require('mongoose').Schema;

module.exports = new Schema({
  auth: {
    local: {
      email: { type: String, required: true },
      password: String
    },
    facebook: {
      id: String,
      clientID: String,
      clientSecret: String,
      callbackURL: String,
      forename: String,
      surname: String
    }
  },
  contact: { 
    email: { type: String, required: true },
    mobile: Number,
    address: String,
    website: String
  },
  details: {
    forename: String,
    surname: String,
    age: String,
    country: String,
    city: String
  },
  job: {
    title: String,
    department: String,
    industry: String,
    company: String
  },
  stats: {
    raw: {
      pay: Number,
      hoursPerWeek: Number,
      lengthOfBreaks: Number,
      breaksPerWeek: Number
    },
    calculated: {
      pay: Number,
      hourlyRate: Number,
      weeklyRate: Number,
      hoursPerWeek: Number,
      lengthOfBreaks: Number,
      breaksPerWeek: Number,
      timePerWeek: Number,
      timePerMonth: Number,
      timePerYear: Number,
      payPerWeek: Number,
      payPerMonth: Number,
      payPerYear: Number
    }
  },
  created: { type: String, required: true },
  lastUpdated: { type: String, required: true }
});