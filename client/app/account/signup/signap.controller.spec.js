'use strict';
describe('Signup controller', function () {
  // load the controller's module
  beforeEach(module('theBossApp'));
  beforeEach(module('socketMock'));

  var SignupCtrl,
      scope, AuthMock, $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,$q, _$location_) {
    scope = $rootScope.$new();
    $location = _$location_;

    AuthMock = {
     createUser: function(user){
       var deferred = $q.defer();
       deferred.resolve();
       return deferred.promise;
     }
    };
    spyOn(AuthMock, "createUser").andCallThrough();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope,
      Auth: AuthMock,
      $location: $location
    });

  }));

  it('should call createUser on valid form', function () {
    var form = {$valid: true};
    scope.user = {
      name: 'User Name',
      email: 'email@email.com',
      password: 'pass',
      owner: 'owner1'
    };
    scope.register(form);
    expect(AuthMock.createUser).toHaveBeenCalled();
  });

  it('should not call createUser on invalid form', function () {
    var form = {$valid: false};
    scope.user = {
      name: 'User Name',
      email: 'email@email.com',
      password: 'pass',
      owner: 'owner1'
    };
    scope.register(form);
    expect(AuthMock.createUser).wasNotCalled();
  });
});
