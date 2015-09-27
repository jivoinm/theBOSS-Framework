'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModuleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  owner: String,
  roles: [String],
  _forms: [
    {
      formId: {type: Schema.Types.ObjectId, ref: 'Form'},
      name: String
    }
    ]
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

ModuleSchema
  .virtual('hasForms')
  .get(function() {
    return this._forms.length > 0;
  });

module.exports = mongoose.model('Module', ModuleSchema);
