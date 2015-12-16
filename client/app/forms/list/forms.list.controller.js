'use strict';

angular.module('theBossApp')
  .controller('FormsListCtrl', function ($scope, forms, $stateParams) {
    $scope.selectedValue = {};
    $scope.form = {};
    $scope.totalRecords = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 10;

    $scope.loadList = function(){
        if($stateParams.formId) {
          var query = {id: $stateParams.formId};
          if($scope.orderby){
              query.orderby = $scope.orderby;
          }
          if($scope.order){
              query.order = $scope.order;
          }

          if($scope.queryText){
              query.text = $scope.queryText;
          }

          query.limit = $scope.maxSize;
          query.page = $scope.currentPage;

          forms.values(query, function(value){
            $scope.formValue = value;
            $scope.form = value.form;
            $scope.totalRecords = value.total;
            $scope.page = value.page;
          });
        }
    };

    $scope.loadList();

    $scope.itemDetails = function(val) {
      $scope.selectedValue = $scope.selectedValue._id !== val._id ? val : {};
    }

    $scope.$watch('currentPage', function (page1, page2) {
      if(page1 != page2)
      {
        $scope.loadList();
      }
    });
  });
