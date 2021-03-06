'use strict';

describe('Directive: field', function () {

  // load the directive's module
  beforeEach(module('theBossApp'));

  var element,
    scope,
    $compile,
    changeInputField;

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
    changeInputField = function(value){
      scope.$digest();
      var input = element.find('.form-control').eq(0);
      input.val(value);
      input.trigger('change');
      scope.$apply();
    }
  }));

  var getField = function(title, type, defaultValue, options, prefix){
    return {
      title: title,
      key: title.toLowerCase().replace(' ','_').replace('.','_'),
      type: type,
      options: options,
      defaultValue: defaultValue,
      require: true,
      prefix: prefix,
      position: 0
    };
  };

  it('should show message when field directive is missing the ng-field attribute', function () {
    element = angular.element('<field></field>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('missing ng-field on the directive');
  });

  it('should render input text on a text field type', function () {
    scope.field = getField('Input Box', 'text');
    element = angular.element('<field ng-model="model" ng-field="field"></field>');
    element = $compile(element)(scope);
    var input = element.find('[name=fieldName]')[0];
    expect(input.type).toBe('text');
  });

  it('should save field on a scope model', function () {
    scope.model = {};
    scope.field = getField('Field 1', 'text', '');
    element = angular.element('<field ng-model="model" ng-field="field"></field>');
    element = $compile(element)(scope);
    changeInputField('test');
    expect(scope.model.field).not.toBeUndefined();
  });

  it('should calculate field value on add', function () {
    scope.field = getField('Input Box', 'formula', '0', '=sections.section_1.field_1_1+sections.section_1.field_1_2');
    scope.model = {
      sections: {
        section_1: {
          field_1_1 : {
            value: 1
          },
          field_1_2: {
            value: 2
          }
        }
      }
    };
    element = angular.element('<field ng-model="model.sections[section_1][field_1_3]" ng-field="field" form-value="model"></field>');
    element = $compile(element)(scope);
    changeInputField('test');
    var input = element.find('[name=fieldName]')[0];
    expect(input.value).toBe('3');

  });

  it('should calculate field value on extract', function () {
    scope.field = getField('Input Box', 'formula', '0', '=sections.section_1.field_1_2-sections.section_1.field_1_1');
    scope.model = {
      sections: {
        section_1: {
          field_1_1 : {
            value: 1
          },
          field_1_2: {
            value: 2
          }
        }
      }
    };
    element = angular.element('<field ng-model="model.sections[section_1][field_1_3]" ng-field="field" form-value="model"></field>');
    element = $compile(element)(scope);
    changeInputField('test');
    var input = element.find('[name=fieldName]')[0];
    expect(input.value).toBe('1');

  });
  it('should calculate field value on multiply', function () {
    scope.field = getField('Input Box', 'formula', '0', '=sections.section_1.field_1_2*sections.section_1.field_1_1');
    scope.model = {
      sections: {
        section_1: {
          field_1_1 : {
            value: 2
          },
          field_1_2: {
            value: 2
          }
        }
      }
    };
    element = angular.element('<field ng-model="model.sections[section_1][field_1_3]" ng-field="field" form-value="model"></field>');
    element = $compile(element)(scope);
    changeInputField('test');
    var input = element.find('[name=fieldName]')[0];
    expect(input.value).toBe('4');

  });

  it('should calculate field value on div', function () {
    scope.field = getField('Input Box', 'formula', '0', '=sections.section_1.field_1_2/sections.section_1.field_1_1');
    scope.model = {
      sections: {
        section_1: {
          field_1_1 : {
            value: 2
          },
          field_1_2: {
            value: 2
          }
        }
      }
    };
    element = angular.element('<field ng-model="model.sections[section_1][field_1_3]" ng-field="field" form-value="model"></field>');
    element = $compile(element)(scope);
    changeInputField('test');
    var input = element.find('[name=fieldName]')[0];
    expect(input.value).toBe('1');

  });

  it('should calculate field value on multiple opertiors', function () {
    scope.field = getField('Input Box', 'formula', '0', '=(sections.section_1.field_1_2 * 2)/sections.section_1.field_1_1');
    scope.model = {
      sections: {
        section_1: {
          field_1_1 : {
            value: 5
          },
          field_1_2: {
            value: 5
          }
        }
      }
    };
    element = angular.element('<field ng-model="model.sections[section_1][field_1_3]" ng-field="field" form-value="model"></field>');
    element = $compile(element)(scope);
    changeInputField('test');
    var input = element.find('[name=fieldName]')[0];
    expect(input.value).toBe('2');

  });

  it('should add prefix to calculated result', function () {
    scope.field = getField('Input Box', 'formula', '0', '=sections.section_1.field_1_1+sections.section_1.field_1_2', 'm2');
    scope.model = {
      sections: {
        section_1: {
          field_1_1 : {
            value: 1
          },
          field_1_2: {
            value: 2
          }
        }
      }
    };
    element = angular.element('<field ng-model="model.sections[section_1][field_1_3]" ng-field="field" form-value="model"></field>');
    element = $compile(element)(scope);
    changeInputField('test');
    var inputAddon = element.find('.input-group-addon')[0];
    expect(inputAddon.innerText).toBe('m2');
  });

});
