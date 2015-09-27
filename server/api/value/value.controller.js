'use strict';

var _ = require('lodash');
var Value = require('./value.model');

// Get list of values
exports.index = function(req, res) {
  Value.find(function (err, values) {
    if(err) { return handleError(res, err); }
    return res.json(200, values);
  });
};

// Get a single value
exports.show = function(req, res) {
  Value.findById(req.params.id, function (err, value) {
    if(err) { return handleError(res, err); }
    if(!value) { return res.send(404); }
    return res.json(value);
  });
};

// Creates a new value in the DB.
exports.create = function(req, res) {
  Value.create(req.body, function(err, value) {
    if(err) { return handleError(res, err); }
    return res.json(201, value);
  });
};

// Updates an existing value in the DB.
exports.update = function(req, res) {

  // if(req.body._id) {
  //   var id = req.body._id;
  //   delete req.body._id;
  //   Value.update({_id: id}, req.body, {upsert: true}, function(err, nrRecords, rawRecord){
  //     if (err) { return handleError(res, err); }
  //     Value.findById(req.params.id, function (err, value) {
  //       if(err) { return handleError(res, err); }
  //       if(!value) { return res.send(404); }
  //       return res.json(value);
  //     });
  //   });
  // }
  delete req.body._id;
  delete req.body.__v;

  Value.update({_id:req.params.id}, { $set: { sections: req.body.sections }}, {upsert: true}, function (err, value) {
    if (err) { return handleError(res, err); }
    if(!value) { return res.send(404); }
      return res.json(200, value);
    });
};

// Deletes a value from the DB.
exports.destroy = function(req, res) {
  Value.findById(req.params.id, function (err, value) {
    if(err) { return handleError(res, err); }
    if(!value) { return res.send(404); }
    value.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
