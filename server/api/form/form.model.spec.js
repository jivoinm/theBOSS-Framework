'use strict';

var should = require('should');
var app = require('../../app');
var Form = require('./form.model');



describe('Form Model', function() {
  var form = new Form({
    name: 'Form name',
    info: 'About the form',
    active: true
  });
  before(function(done) {
    // Clear forms before testing
    Form.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Form.remove().exec().then(function() {
      done();
    });
  });



  it('should fail when saving a duplicate form', function(done) {
    form.save(function() {
      var formDup = new Form(form);
      formDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an name', function(done) {
    form.name = '';
    form.save(function(err) {
      should.exist(err);
      done();
    });
  });
});

describe('Form Model with fields', function() {
  var form = new Form({
    name: 'Form name',
    info: 'About the form',
    active: true
  });
  before(function(done) {
    // Setup form
    Form.remove().exec().then(function() {
      form.sections =       {
        'Section 1': {
            'Field 1' : {
                type: 'Text',
                default_value: '',
                require: true,
                position:0
              }
          },
        'Section 2': {
            'Field 1': {
                type: 'Text',
                default_value: '',
                require: true,
                position:0
              }
          }
      };

      done();
    });
  });

  afterEach(function(done) {
    Form.remove().exec().then(function() {
      done();
    });
  });

  it('should save sections', function (done) {
    form.save(function (err, savedForm) {
      should.not.exist(err);
      should.exist(savedForm.sections['Section 1']);
      done();
    });
  });

  it('should update section field', function (done) {
    form.sections['Section 1']['Field 1'].type = 'Select';
    form.save(function (err, savedForm) {
      should.not.exist(err);
      savedForm.sections['Section 1']['Field 1'].type.should.be.equal('Select');
      done();
    });
  });
});
