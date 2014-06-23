'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /api/users/me/todos', function() {
  
  it('should respond with 401 Unauthorized', function(done) {
    request(app)
      .get('/api/users/me/todos')
      .expect(401)
      //.expect('Content-Type', /text/plain; charset=utf-8/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});