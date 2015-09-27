'use strict';

describe('Controller: FormsListCtrl', function () {

  // load the controller's module
  beforeEach(module('theBossApp'));

  var FormsListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormsListCtrl = $controller('FormsListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
