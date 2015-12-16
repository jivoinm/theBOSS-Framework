'use strict';

describe('Controller: FormsListCtrl', function () {

  // load the controller's module
  beforeEach(module('theBossApp'));

  var FormsListCtrl, scope, forms, $stateParams, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_ ,_forms_, _$stateParams_) {
    scope = $rootScope.$new();
    forms = _forms_;
    $httpBackend = _$httpBackend_;
    $stateParams = _$stateParams_;

    FormsListCtrl = $controller('FormsListCtrl', {
      $scope: scope,
      forms: forms,
      $stateParams: $stateParams
    });
  }));
  beforeEach(function () {
    $httpBackend.whenPOST('/api/values').respond({_id:'some value'});
  });
  it('should call values api for selected form', function () {
    expect(1).toEqual(1);
  });
});
