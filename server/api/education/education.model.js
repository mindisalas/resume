'use strict';

import mongoose from 'mongoose';

var EducationSchema = new mongoose.Schema({
  institution: String,
  fieldOfStudy: String,
  fsStartDate: String,
  fsFinishDate: String,
  certTitle: String
});

export default mongoose.model('Education', EducationSchema);
