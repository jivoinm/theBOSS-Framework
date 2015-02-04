'use strict';

var _ = require('lodash');
var Module = require('./module.model');
var User = require('../user/user.model');

// Get list of modules
exports.index = function(req, res) {
  Module.find(function (err, modules) {
    if(err) { return handleError(res, err); }
    return res.json(200, modules);
  });
};

// Get a single module
exports.show = function(req, res) {
  Module.findById(req.params.id, function (err, module) {
    if(err) { return handleError(res, err); }
    if(!module) { return res.send(404); }
    return res.json(module);
  });
};

// Get logged in user modules
exports.myModules = function(req, res) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    Module.find({owner: user.owner}, function (err, modules) {
      if(err) { return handleError(res, err); }
      if(!modules) { return res.send(404); }
      return res.json(modules);
    });
  });
};

// Creates a new module in the DB.
exports.create = function(req, res) {
  Module.create(req.body, function(err, module) {
    if(err) { return handleError(res, err); }
    return res.json(201, module);
  });
};

// Updates an existing module in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Module.findById(req.params.id, function (err, module) {
    if (err) { return handleError(res, err); }
    if(!module) { return res.send(404); }
    var updated = _.merge(module, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, module);
    });
  });
};

// Deletes a module from the DB.
exports.destroy = function(req, res) {
  Module.findById(req.params.id, function (err, module) {
    if(err) { return handleError(res, err); }
    if(!module) { return res.send(404); }
    module.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
