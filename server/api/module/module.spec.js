'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest')(app);
var Module = require('./module.model');

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
  before(function (done) {
    // Clear modules before testing
    Module.remove().exec().then(function() {
      Module.create({
        name: 'Module1',
        info: 'About the module',
        active: true,
        owner: 'Owner1',
        roles: ['admin','role1']
      }, {
          name: 'Module2',
          info: 'About the module',
          active: true,
          owner: 'Owner2',
          roles: ['admin','role2']
        }, function() {
          done();
        });
    });
  });

  describe("Admin operations", function () {
    before(loginUser(auth, 'admin@admin.com', 'admin', 'owner1'));

    it('should respond with JSON array queried by owner', function(done) {
      request
          .get('/api/modules/my')
          .set('Authorization', 'bearer ' + auth.token)
          .set('owner', 'owner1')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              res.body.length.should.equal(1);
              done();
          });
    });
  });

  describe("Non admin operations", function () {
    before(loginUser(auth, 'test@test.com', 'test', 'owner1'));

    it("should not return any module if user is not in role", function (done) {
        request
            .get('/api/modules/my')
            .set('Authorization', 'bearer ' + auth.token)
            .set('owner', 'owner1')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body.length.should.equal(0);
                done();
            });
    });
  });
});

//Login user method
function loginUser(auth, username, pass, ownername) {
  return function(done) {
      request
        .post('/auth/local')
        .send({
            email: username,
            password: pass,
            owner: ownername
        })
        .expect(200)
        .end(onResponse);
      function onResponse(err, res) {
        auth.token = res.body.token;
        return done();
      }
  };
}
