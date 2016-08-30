'use strict';

import mongoose from 'mongoose';

var PersonInfoSchema = new mongoose.Schema({
  institution: String,
  sortOrder: Number
});

export default mongoose.model('PersonInfo', PersonInfoSchema);
