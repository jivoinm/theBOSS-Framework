'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModuleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  owner: String,
  _forms: [{type: Schema.Types.ObjectId, ref: 'Form'}]
});

/**
 * Validations
 */

// Validate empty name
ModuleSchema
  .path('name')
  .validate(function(name) {
    return name.length;
  }, 'Name cannot be blank');

// Validate empty owner
ModuleSchema
  .path('owner')
  .validate(function(owner) {
    return owner.length;
  }, 'Owner cannot be blank');


module.exports = mongoose.model('Module', ModuleSchema);