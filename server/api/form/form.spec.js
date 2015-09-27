'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var mongoose = require('mongoose')
var Model = mongoose.model('Form');

describe('/api/forms', function() {
  var createdModel;
  beforeEach(function(done){
      Model.create({
        name: 'Test form1'
      }, function(err, model){
        createdModel = model;
        done();
      });
  });

  afterEach(function(done){
    Model.find({}).remove(function(){
      done();
    });
  });

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/forms')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(1);
        done();
      });
  });

  it('should respond one record as a JSON', function(done){
    request(app)
      .get('/api/forms/'+createdModel._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name = createdModel.name;
        done();
      });
  });


  it('should respond new record as a JSON', function(done){
    var formModel = {
      name: 'test1'
    };

    request(app)
      .post('/api/forms')
      .send(formModel)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body._id.should.not.be.null;
        res.body.name = formModel.name;
        done();
      });
  });



  it('should respond with 204 when a record is deleted', function(done) {
    request(app)
      .delete('/api/forms/'+createdModel._id)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.empty;
        done();
      });
  })
});
