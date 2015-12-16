'use strict';

angular.module('theBossApp')
  .controller('FormsCtrl', function ($scope, forms, value, $stateParams, $location) {
    //$scope.form = {};
    $scope.model = {sections:{}};
    if(!$stateParams.valueId) {
      forms.get({id: $stateParams.formId},function(form){
        $scope.form = form;
      });
    }else{
      value.get({id: $stateParams.valueId}, function(value){
        $scope.model = value;
      });
    }

    $scope.save = function(formModel){
      if(formModel.$valid){
        //save value
        if($scope.model.$save){
          //update
          $scope.model.$save(function(value){
            $scope.model = value;
          });
        }else{
          $scope.model = new value($scope.model);
          $scope.model._form = {
            formId: $scope.form._id,
            name: $scope.form.name,
            info: $scope.form.info
          };
          $scope.model.$save(function(value){
            //console.log(value);
            $scope.model = value;
          });
        }
        $location.path('/forms/'+$scope.model._form.formId+'/list');
      }
    };
  });
