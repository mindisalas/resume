'use strict';

import mongoose from 'mongoose';

var SkillSchema = new mongoose.Schema({
  institution: String,
  sortOrder: Number
});

export default mongoose.model('Skill', SkillSchema);
