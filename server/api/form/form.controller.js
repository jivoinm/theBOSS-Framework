'use strict';

var _ = require('lodash');
var Form = require('./form.model');
var Value = require('../value/value.model');

// Get list of forms
exports.index = function(req, res) {
  Form.find(function (err, forms) {
    if(err) { return handleError(res, err); }
    return res.json(200, forms);
  });
};

// Get a single form
exports.show = function(req, res) {
  Form.findById(req.params.id, function (err, form) {
    if(err) { return handleError(res, err); }
    if(!form) { return res.send(404); }
    return res.json(form);
  });
};
// Get form values
exports.loadFormValues = function(req, res) {
  var page = req.query.page || 1;
  var limit = req.query.limit || 25;
  var queryObject = {'_form.formId': req.params.id};
  var query = Value.find(queryObject);
  if(req.query.sort){
    query.sort(req.query.sort);
  }
  
  query.skip((page * limit) - limit);
  query.limit(limit);

  query.exec(function (err, values) {
    if(err) { return handleError(res, err); }
    if(!values) { return res.send(404); }
    Form.findById(req.params.id, function(err,form){
      Value.count(queryObject, function(err, count){
        return res.json({
            result: values,
            form: form,
            page: page,
            total: count
        });
      });
    });
  });
};

// Creates a new form in the DB.
exports.create = function(req, res) {
  Form.create(req.body, function(err, form) {
    if(err) { return handleError(res, err); }
    return res.json(201, form);
  });
};

// Updates an existing form in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Form.findById(req.params.id, function (err, form) {
    if (err) { return handleError(res, err); }
    if(!form) { return res.send(404); }
    var updated = _.merge(form, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, form);
    });
  });
};

// Deletes a form from the DB.
exports.destroy = function(req, res) {
  Form.findById(req.params.id, function (err, form) {
    if(err) { return handleError(res, err); }
    if(!form) { return res.send(404); }
    form.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
