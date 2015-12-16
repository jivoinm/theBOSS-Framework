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
  _createdAt: Date,
  _lastUpdated: Date,
  sections: Schema.Types.Mixed
});

ValueSchema.pre('save', function(next){
  var now = new Date();
  this._lastUpdated = now;
  if ( !this._createdAt ) {
    this._createdAt = now;
  }
  next();
});
module.exports = mongoose.model('Value', ValueSchema);
