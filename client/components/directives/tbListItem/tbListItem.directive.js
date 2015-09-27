'use strict';

angular.module('theBossApp')
  .directive('tbListItem', function ($compile, $parse) {
    return {
    //  templateUrl: 'components/directives/tbListItem/tbListItem.html',
      restrict: 'E',
      replace: true,
      scope: {
        listItem: '=',
        listItemValue: '='
      },
      link: function (scope, element, attrs) {
        if(!scope.listItem || !scope.listItemValue){
          element.text('attributes listItem and listItemValue are required on the scope, add list-item and list-item-vlue attributes.');
          return;
        }

        var value = '';
        if(scope.listItem.key){
          var fn = scope.listItem.key;
          var getter = $parse(fn);
          var property = getter(scope.listItemValue);
          value = property != null ? property.value : '';
        }
        element.text(value);
      }
    };
  });
