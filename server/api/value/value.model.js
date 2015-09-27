'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ValueSchema = new Schema({
  _form: {
    formId: {type: Schema.Types.ObjectId, ref: 'Form'},
    name: String,
    info: String
  },
  active: Boolean,
  sections: Schema.Types.Mixed
});

module.exports = mongoose.model('Value', ValueSchema);
