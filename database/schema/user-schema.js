/**
 * Created by jahansj on 31/10/2016.
 */
const Schema = require('mongoose').Schema;

module.exports = new Schema({
  auth: {
    local: {
      email: { type: String, required: true, unique: true },
      password: String
    },
    facebook: {
      clientID: String,
      clientSecret: String,
      callbackURL: String
    },
    twitter: {
      consumerKey: String,
      consumerSecret: String,
      callbackURL: String
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
    age: Number,
    country: String,
    city: String,
    company: String
  },
  job: {
    title: String,
    department: String,
    industry: String
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
  created: { type: Date, required: true },
  lastUpdated: { type: Date, required: true }
});