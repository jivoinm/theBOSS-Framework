'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var user1 = request.agent();

describe('GET /api/modules', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/modules')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/modules/my', function() {

  it('should respond with JSON array queried by owner', loginUser(user1) {
    user1
      .get('/api/modules/my')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

function loginUser(agent) {
  return function(done) {
    agent
    .post('http://localhost:3000/signin')
    .send({ email: 'test@dummy.com', password: 'bacon' })
    .end(onResponse);
      function onResponse(err, res) {
        res.should.have.status(200);
        res.text.should.include('Dashboard');
        return done();
      }
  };
};
