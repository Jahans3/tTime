/**
 * Created by jahansj on 31/10/2016.
 */
const Schema = require('mongoose').Schema;

module.exports = new Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  auth: {
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
    industry: String
  },
  stats: {
    raw: {
      pay: { type: Number, required: true },
      hoursPerWeek: { type: Number, required: true },
      lengthOfBreaks: { type: Number, required: true },
      breaksPerWeek: { type: Number, required: true }
    },
    calculated: {
      pay: { type: Number, required: true },
      hourlyRate: { type: Number, required: true },
      weeklyRate: { type: Number, required: true },
      hoursPerWeek: { type: Number, required: true },
      lengthOfBreaks: { type: Number, required: true },
      breaksPerWeek: { type: Number, required: true },
      timePerWeek: { type: Number, required: true },
      timePerMonth: { type: Number, required: true },
      timePerYear: { type: Number, required: true },
      payPerWeek: { type: Number, required: true },
      payPerMonth: { type: Number, required: true },
      payPerYear: { type: Number, required: true }
    }
  },
  created: { type: Date, required: true },
  lastUpdated: { type: Date, required: true }
});