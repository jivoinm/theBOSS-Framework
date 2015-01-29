'use strict';

describe('Service: navbarService', function () {

  // load the service's module
  beforeEach(module('theBossApp'));

  // instantiate service
  var navbarService;
  beforeEach(inject(function (_navbarService_, _$httpBackend_) {
    navbarService = _navbarService_;
  }));

  it('should load current owner modules', function () {

    expect().toBe(true);
  });

});
