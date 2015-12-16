'use strict';

angular.module('theBossApp')
  .directive('field', function ($http, $compile, $timeout, User, datepickerConfig, $rootScope, $parse) {

        var formField = function(field){
            return '<div ng-form="form" class="form-group" ng-class="{\'has-error\' :  form.fieldName.$invalid  }">' +
                '<label>{{field.title}}</label>' +field+'</div>' +
                '</div>';
        };

        var getFormulaValues = function(fn, listItemValue){
          fn = fn.substring(1, fn.length);
          var formulaValues = fn;
          fn = fn.replace('+','#').replace('-','#').replace('*','#').replace('/','#')
          var formulas = fn.split('#');

          var processed = false;
          angular.forEach(formulas, function(formula){
            formula = formula.replace('(','').replace(')','');
            var getProperty = $parse(formula);
            var value = getProperty(listItemValue);
            if(value && value.value != null){
              formulaValues = formulaValues.replace(formula, value.value);
              processed = true;
            }else{
              processed = false;
            }
          });
          return processed ? formulaValues : null;
        };

        var calculateValue = function(scope){
          scope.model = scope.model || {};
          var value = '';
          var fn = scope.field.options;
          if(fn.indexOf('=') === 0){
            //this is a formula
            var formValue = scope.formValue;
            var formulaValues = getFormulaValues(fn, formValue);
            if(formulaValues){
              var formula = math.parse(formulaValues);
              var code = formula.compile(math);
              value = code.eval(formValue);
            }
          }else{
            var getter = $parse(fn);
            value = getter(formValue).value;
          }
          scope.model.value = value;
        };

        function getFieldTemplate(scope, element, attr){
            var fieldTemplate = '';

            switch(scope.field.type) {
                case 'date':
                    scope.today = function() {
                        scope.field.value = new Date();
                    };

                    scope.clear = function () {
                        scope.field.value = null;
                    };

                    // Disable weekend selection
                    scope.disabled = function(date, mode) {
                        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
                    };

                    scope.toggleMin = function() {
                        scope.minDate = scope.minDate ? null : new Date();
                    };

                    if(_.some(scope.field.show_options, function(option) {
                            return option.showMinToday;
                        })){
                        scope.minDate = new Date();
                        datepickerConfig.minDate = new Date();
                    }
                    var minDate = _.some(scope.field.show_options, function(option) {
                            return option.minDate;
                        });

                    if(minDate){
                        scope.minDate = minDate;
                        datepickerConfig.minDate = minDate;
                    }


                    scope.show_calendar = false;
                    scope.openCalendar = function($event){
                        $event.preventDefault();
                        $event.stopPropagation();

                        scope.show_calendar = true;
                    };

                    scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1,

                    };

                    scope.initDate = new Date(scope.field.value);
                    scope.format = 'dd-MMMM-yyyy';

                    fieldTemplate = '<div class="row">' +
                        '<div class="col-md-6">' +
                        '<p class="input-group">' +
                        '<input type="text" class="form-control" datepicker-append-to-body="false" datepicker-popup="{{ format }}" name="fieldName" placeholder="{{field.title}}"'+
                        'ng-model="model.value"  ng-required="{{ field.require }}" is-open="show_calendar" close-text="Close" min-date="minDate"/>' +
                        '<span class="input-group-btn">' +
                        '<button type="button" class="btn btn-default" ng-click="openCalendar($event)"><i class="glyphicon glyphicon-calendar"></i></button>' +
                        '</span>' +
                        '</p>' +
                        '</div>' +
                        '</div>';

                    break;
                case 'text':
                    fieldTemplate = '<input type="text" class="form-control" name="fieldName" placeholder="{{field.title}}"'+
                        'ng-model="model.value"  ng-required="{{ field.require }}"/>';
                    break;
                case 'number':
                    fieldTemplate = '<input type="number" class="form-control" name="fieldName" placeholder="{{field.title}}"'+
                        'ng-model="model.value"  ng-required="{{ field.require }}"/>';
                    break;
                case 'hidden':
                    fieldTemplate = '<input type="hidden" class="form-control" name="fieldName" ng-model="model.value" />';
                    return fieldTemplate;
                case 'password':
                    fieldTemplate = '<input type="password" class="form-control" name="fieldName" placeholder="{{field.title}}"'+
                        'ng-model="model.value"  ng-required="{{ field.require }}"/>';
                    break;
                case 'email':
                    fieldTemplate = '<div class="input-group">' +
                        '<span class="input-group-addon"><i class="fa fa-envelope-o fa-fw"></i></span>' +
                        '<input type="email" class="form-control" name="fieldName" placeholder="{{field.title}}"'+
                        'ng-model="model.value" ng-required="{{ field.require }}"/>' +
                        '</div>';
                    break;
                case 'user':
                    var userRoles = scope.field.show_options;
                    scope.getUsers = function (text){
                        var userQuery = {name: text};
                        if(scope.field.show_options){
                          userQuery.role = scope.field.show_options;
                        }
                        return User.query(userQuery).$promise.then(function(users){
                            var usersToAdd = [];
                            angular.forEach(users, function (user){
                                usersToAdd.push(user);
                            });
                            return usersToAdd;
                        });
                    };
                    scope.selectedUser = function(item, model, label){
                       scope.model = {
                         user_id: item._id,
                         name: item.name,
                         email: item.email
                       };
                       $rootScope.$broadcast(theBossSettings.userAutoCompleteSelectedEvent, {fieldName: scope.field.title, value: item.name});
                    };

                    fieldTemplate = ' <input type="text" ng-model="model.value" placeholder="lookup user" typeahead-on-select="selectedUser($item, $model, $label)" typeahead="(user.name + \', \'+ user.email) for user in getUsers($viewValue)" typeahead-loading="loadingLocations" class="form-control"><i ng-show="loadingLocations" class="glyphicon glyphicon-refresh"></i>';
                    break;
                case 'select':
                    fieldTemplate = '<select name="fieldName" class="form-control" placeholder="{{field.title}}"'+
                         'ng-model="model.value"  ng-required="{{ field.require }}" ng-options="value for value in splitOptions(field.show_options)"'+
                         'ng-show="!editmode">' +
                         '<option value=""></option>'+
                         '</select>';
                    break;
                case 'checkbox':
                    fieldTemplate = '<div class="checkbox">' +
                            '<label>' +
                                '<input type="checkbox" name="fieldName" ng-model="model.value" ng-required="{{ field.require }}">' +
                            '</label>' +
                    '</div>';
                    break;
                case 'radio':
                    fieldTemplate = '<div class="radio"> ' +
                        '<div class="radio" ng-repeat="option in splitOptions(field.show_options)">' +
                        '<label><input type="radio" name="fieldName" ng-model="model.value" ng-value="option">{{ option }}</label>' +
                        '</div>' +
                    '</div>';
                    break;
                case 'textarea':

                    fieldTemplate = '<textarea class="form-control" rows="3" name="fieldName" placeholder="{{field.title}}"'+
                        'ng-model="model.value"  ng-required="{{ field.require }}"/>';
                    break;
                case 'tokens':

                    fieldTemplate = '<input type="text" class="form-control tokenfield" name="fieldName"'+
                        'ng-model="model.value" ng-required="{{ field.require }}"/>';
                    break;
                case 'composite':
                    fieldTemplate = '<div class="well"><div  field ng-model="composite_field.value" ng-field="composite_field" ng-repeat="composite_field in field.show_options"></div></div>';
                    break;
                case 'formula':
                    scope.$on('calculate', function(){
                      calculateValue(scope);
                    });
                    calculateValue(scope);
                    fieldTemplate = '<input type="text" class="form-control" name="fieldName" placeholder="{{field.title}}"'+
                        'ng-model="model.value"  disabled/>';
                    break;
                }
            fieldTemplate = scope.field.prefix ? '<div class="input-group">'+ fieldTemplate +
  '<span class="input-group-addon" id="basic-addon2">{{field.prefix}}</span></div>' : fieldTemplate;
            return formField(fieldTemplate);
        }

        return {
            restrict: 'E',
            scope: {
                model: '=ngModel',
                field: '=ngField',
                formValue: '=',
                edit: '&',
                delete: '&',
                index: '=',
                preview: '@'
            },
            replace: true,
            link: function(scope, elem, attr, form){
                scope.splitOptions = function(optionString){
                    if( Object.prototype.toString.call( optionString ) === '[object Array]' ) return optionString;
                    return optionString ? optionString.split(',') : [];
                };

                if(scope.field) {

                  var $field = $(getFieldTemplate(scope,elem,attr)).appendTo(elem);

                  $compile($field)(scope);
                  scope.$watch('model.value', function(newValue, oldValue){
                    if(scope.model && !scope.model.field){
                      scope.model.field = scope.field;
                    }
                    if(newValue !== oldValue){
                      scope.$root.$broadcast('calculate');
                    }
                  });


                  if(scope.field.type == 'tokens')
                  {
                      $timeout(function() {
                          elem.find('.tokenfield').tokenfield({tokens:scope.field.value});
                      }, 700);

                  }

                  if(scope.field.focus === true){
                      $timeout(function() {
                          elem.find('input, select, textarea').focus();
                      }, 700);

                  }

                } else {
                  elem.text('missing ng-field on the directive');
                }
            }

        };
  });
