'use strict';

var app = require('../..');
import request from 'supertest';

var newPersonInfo;

describe('PersonInfo API:', function() {

  describe('GET /api/personInfos', function() {
    var personInfos;

    beforeEach(function(done) {
      request(app)
        .get('/api/personInfos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          personInfos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      personInfos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/personInfos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/personInfos')
        .send({
          name: 'New PersonInfo',
          info: 'This is the brand new personInfo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPersonInfo = res.body;
          done();
        });
    });

    it('should respond with the newly created personInfo', function() {
      newPersonInfo.name.should.equal('New PersonInfo');
      newPersonInfo.info.should.equal('This is the brand new personInfo!!!');
    });

  });

  describe('GET /api/personInfos/:id', function() {
    var personInfo;

    beforeEach(function(done) {
      request(app)
        .get('/api/personInfos/' + newPersonInfo._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          personInfo = res.body;
          done();
        });
    });

    afterEach(function() {
      personInfo = {};
    });

    it('should respond with the requested personInfo', function() {
      personInfo.name.should.equal('New PersonInfo');
      personInfo.info.should.equal('This is the brand new personInfo!!!');
    });

  });

  describe('PUT /api/personInfos/:id', function() {
    var updatedPersonInfo;

    beforeEach(function(done) {
      request(app)
        .put('/api/personInfos/' + newPersonInfo._id)
        .send({
          name: 'Updated PersonInfo',
          info: 'This is the updated personInfo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPersonInfo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPersonInfo = {};
    });

    it('should respond with the updated personInfo', function() {
      updatedPersonInfo.name.should.equal('Updated PersonInfo');
      updatedPersonInfo.info.should.equal('This is the updated personInfo!!!');
    });

  });

  describe('DELETE /api/personInfos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/personInfos/' + newPersonInfo._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when personInfo does not exist', function(done) {
      request(app)
        .delete('/api/personInfos/' + newPersonInfo._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
