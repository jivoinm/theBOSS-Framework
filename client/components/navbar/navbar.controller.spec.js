'use strict';

describe('Controller: NavbarCtrl', function () {

  // load the controller's module
  beforeEach(module('theBossApp'));
  beforeEach(module('socketMock'));

  var NavbarCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/modules')
      .respond([

        ]);

    scope = $rootScope.$new();
    NavbarCtrl = $controller('NavbarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of modules to the scope', function () {
    $httpBackend.flush();
    expect(scope.modules.length).toBe(2);
  });
});
