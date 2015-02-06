'use strict';

describe('Service: navbarService', function () {

  // load the service's module
  beforeEach(module('theBossApp'));

  // instantiate service
  var navbarSrv, $httpBackend, $cookieStore, $q;
  var data = [{_id:0, name: 'Module1'}];
  beforeEach(inject(function (_navbarSrv_, _$httpBackend_, _$cookieStore_, _$q_) {
    navbarSrv = _navbarSrv_;
    $httpBackend = _$httpBackend_;
    $cookieStore = _$cookieStore_;
    $q = _$q_;

  }));

  it('should load modules from repository on first load', function () {

    $httpBackend.whenGET("/api/modules/my").respond(data);
    var modules = navbarSrv.getLoggedUserModules();
    $httpBackend.flush();
    expect(modules.$$state.value[0].name).toEqual(data[0].name);
  });

  it('should load modules from cookieStore after the first load', function () {
    spyOn($cookieStore, "get").andReturn(data);
    var modules = navbarSrv.getLoggedUserModules();
    expect(modules.$$state.value[0].name).toEqual(data[0].name);
  });

});
