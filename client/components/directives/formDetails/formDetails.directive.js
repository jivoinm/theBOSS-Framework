'use strict';

angular.module('theBossApp')
  .directive('formDetails', function () {
    return {
      templateUrl: 'components/directives/formDetails/formDetails.html',
      restrict: 'E',
      scope: {
      	formValue: '=',
        form: '='
      },
      link: function (scope, element, attrs) {
      	if(!scope.formValue || !scope.form)
      	{
      		element.text('form-details directive requires form-value and form attribute');
      		return;
      	}
      }
    };
  });