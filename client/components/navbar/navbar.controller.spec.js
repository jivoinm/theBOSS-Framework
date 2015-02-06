'use strict';

describe('Controller: NavbarCtrl', function () {

  // load the controller's module
  beforeEach(module('theBossApp'));
  beforeEach(module('socketMock'));

  var NavbarCtrl,
      scope,
      $location,
      navbarSrv,
      Auth;

  var mockNavbarSrv = {};

  beforeEach(function(){
    module('theBossApp', function($provide) {
      $provide.value('navbarSrv', mockNavbarSrv);
    });
    inject( function ($q) {
      mockNavbarSrv.data = [
      {_id: 0, name: 'Module1'},
      {_id: 1, name: 'Module2'},
      {_id: 2, name: 'Module3'},
      {_id: 3, name: 'Module4'},
      ];

      mockNavbarSrv.getLoggedUserModules = function(){
        var defer = $q.defer();
        defer.resolve(this.data);
        return defer.promise;
      };
    })
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$location_, _Auth_, _navbarSrv_) {
    Auth = _Auth_;
    $location - _$location_;
    scope = $rootScope.$new();
    navbarSrv = _navbarSrv_;
    NavbarCtrl = $controller('NavbarCtrl', {
      $scope: scope,
      $location: $location,
      Auth: Auth,
      navbarSrv: navbarSrv
    });
    scope.$digest();
  }));

  it('should attach a list of modules to the scope', function () {
    expect(scope.modules.length).toBe(4);
  });
});
