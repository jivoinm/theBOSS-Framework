'use strict';

describe('Service: navbarService', function () {

  // load the service's module
  beforeEach(module('theBossApp'));

  // instantiate service
  var navbarSrv, $httpBackend, $cookieStore, $q, ModuleService;
  var data = { modules: [{_id:0, name: 'Module1', _forms: [{_id: 'form1'}]}]};

  beforeEach(inject(function (_navbarSrv_, _$httpBackend_, _$cookieStore_, _$q_, _moduleService_) {
    navbarSrv = _navbarSrv_;
    $httpBackend = _$httpBackend_;
    $cookieStore = _$cookieStore_;
    $q = _$q_;
    ModuleService = _moduleService_;
  }));

  it('should load modules from repository on first load', function () {
    $httpBackend.whenGET('/api/modules/my').respond(data);
    var modules = navbarSrv.getLoggedUserModules();
    $httpBackend.flush();
    expect(modules.$$state.value[0].name).toEqual(data.modules[0].name);
  });

  it("should save modules in cookieStore after the first load", function () {
    spyOn($cookieStore, 'get').andReturn(undefined);
    spyOn($cookieStore, 'put').andCallThrough();
    $httpBackend.whenGET('/api/modules/my').respond(data);
    var modules = navbarSrv.getLoggedUserModules();
    $httpBackend.flush();
    expect($cookieStore.put).toHaveBeenCalled();
  });
  it('should load modules from cookieStore after the first load', function () {
    spyOn($cookieStore, 'get').andReturn(data.modules);
    var modules = navbarSrv.getLoggedUserModules();
    expect(modules.$$state.value[0].name).toEqual(data.modules[0].name);
  });

  it('should load forms form the loaded module', function () {
    var forms = {forms: [{_id: 'form1', name: 'Form1'}]};
    var mdle = new ModuleService({_id:0});
    $httpBackend.whenGET('/api/modules/0/forms').respond(forms);
    var modules = navbarSrv.getForms(mdle);
    $httpBackend.flush();
    expect(modules.$$state.value.forms[0].name).toEqual(forms.forms[0].name);
  });


});
