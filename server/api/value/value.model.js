'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ValueSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  sections: Schema.Types.Mixed
});

module.exports = mongoose.model('Value', ValueSchema);