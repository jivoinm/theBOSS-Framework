'use strict';

describe('Controller: FormsCtrl', function () {

  // load the controller's module
  beforeEach(module('theBossApp'));

  var FormsCtrl, scope,  mockForms, value, $httpBackend, stateParams, controller;
  mockForms = {
    get: function(id, callout){
       callout({_id: id});
    }
  };

  describe('new forms', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _value_, _$stateParams_) {
      scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
      value = _value_;
      stateParams = _$stateParams_;
      controller = $controller;

      spyOn(mockForms, 'get').andCallThrough();
      FormsCtrl = $controller('FormsCtrl', {
        $scope: scope,
        forms: mockForms,
        value: value,
        stateParams: stateParams
      });
    }));

    it('should call Forms.get on controller load', function () {
      expect(mockForms.get).toHaveBeenCalled();
    });

    it('should call save on new model is form is valid', function () {
      $httpBackend.whenPOST('/api/values').respond({_id:'some value'});
      scope.save({$valid: true});
      $httpBackend.flush();
      expect(scope.model._id).toBeDefined();
    });
  });


  describe('existing forms:', function () {
    // Initialize the controller and a mock scope
    var valueId = 'valueId';
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _value_, _$stateParams_) {
      scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
      value = _value_;
      stateParams = _$stateParams_;
      controller = $controller;
      stateParams.valueId = valueId;

      spyOn(mockForms, 'get').andCallThrough();
      FormsCtrl = $controller('FormsCtrl', {
        $scope: scope,
        forms: mockForms,
        value: value,
        stateParams: stateParams
      });
      $httpBackend.whenGET('/api/values/'+valueId).respond({});
      $httpBackend.flush();
    }));

    it('should call save on existing model is form is valid', function () {
      var valueModel = new value({
        _id: 'existing',
        _form:{
          formId: 'FormId'
        }
      });
      scope.model = valueModel;
      $httpBackend.whenPOST('/api/values/'+valueModel._id).respond(valueModel);
      scope.save({$valid: true});
      $httpBackend.flush();
      expect(scope.model).toEqual(valueModel);
    });

    it('should load existing value model if valueid is present in the stateParams and not load the form', function () {

      expect(mockForms.get).wasNotCalled();
    });
  });
});
