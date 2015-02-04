'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest')(app);

describe('GET /api/modules', function() {

  it('should respond with JSON array', function(done) {
    request
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
  var auth = {};
  before(loginUser(auth));

  it('should respond with JSON array queried by owner', function(done) {
    request
        .get('/api/modules/my')
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            done();
        });
    });

    function loginUser(auth) {
      return function(done) {
          request
            .post('/auth/local')
            .send({
                email: 'admin@admin.com',
                password: 'admin'
            })
            .expect(200)
            .end(onResponse);

          function onResponse(err, res) {
            //console.log(res.body);
            auth.token = res.body.token;
            return done();
          }
      };
    }
});
