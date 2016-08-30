'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var personInfoCtrlStub = {
  index: 'personInfoCtrl.index',
  show: 'personInfoCtrl.show',
  create: 'personInfoCtrl.create',
  update: 'personInfoCtrl.update',
  destroy: 'personInfoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var personInfoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './personInfo.controller': personInfoCtrlStub
});

describe('PersonInfo API Router:', function() {

  it('should return an express router instance', function() {
    personInfoIndex.should.equal(routerStub);
  });

  describe('GET /api/personInfos', function() {

    it('should route to personInfo.controller.index', function() {
      routerStub.get
        .withArgs('/', 'personInfoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/personInfos/:id', function() {

    it('should route to personInfo.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'personInfoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/personInfos', function() {

    it('should route to personInfo.controller.create', function() {
      routerStub.post
        .withArgs('/', 'personInfoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/personInfos/:id', function() {

    it('should route to personInfo.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'personInfoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/personInfos/:id', function() {

    it('should route to personInfo.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'personInfoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/personInfos/:id', function() {

    it('should route to personInfo.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'personInfoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
