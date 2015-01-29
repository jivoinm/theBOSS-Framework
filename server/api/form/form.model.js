'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  _module: {type: Schema.Types.ObjectId, ref: 'Module'},
  sections: Schema.Types.Mixed
});

/**
 * Validations
 */

// Validate empty name
FormSchema
  .path('name')
  .validate(function(name) {
    return name.length;
  }, 'Name cannot be blank');


module.exports = mongoose.model('Form', FormSchema);