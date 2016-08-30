'use strict';

import mongoose from 'mongoose';

var JobSchema = new mongoose.Schema({
  companyName: String,
  companyInfo: String,
  coStartDate: String,
  coFinishDate: String,
  jobTitle: [{
    jobTitleName: String,
    jobTitleStart: String,
    jobTitleFinish: String,
    jobTitleAccomplishments: []
  }],
  sortOrder: Number
});

export default mongoose.model('Job', JobSchema);


/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});*/
