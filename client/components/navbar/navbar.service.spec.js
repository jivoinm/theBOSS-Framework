'use strict';

describe('Service: navbarService', function () {

  // load the service's module
  beforeEach(module('theBossApp'));

  // instantiate service
  var navbarSrv, $httpBackend, $cookieStore, $q;
  beforeEach(inject(function (_navbarSrv_, _$httpBackend_, _$cookieStore_, _$q_) {
    navbarSrv = _navbarSrv_;
    $httpBackend = _$httpBackend_;
    $cookieStore = _$cookieStore_;
    $q = _$q_;

  }));

  it('should load current owner modules', function () {
    $httpBackend.whenGET("/api/modules/my").respond([]);
    expect(false).toBe(true);
  });

});
