'use strict';

describe('Directive: tbListItem', function () {

  // load the directive's module and view
  beforeEach(module('theBossApp'));
  beforeEach(module('components/directives/tbListItem/tbListItem.html'));

  var element, scope, $compile;

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  var getField = function(title, type, defaultValue){
    return {
      title: title,
      key: title.toLowerCase().replace(' ','_').replace('.','_'),
      type: type,
      defaultValue: defaultValue,
      require: true,
      position: 0
    };
  };

  var compileListItem = function(){
    element = angular.element('<tb-list-item list-item="fieldItem" list-item-value="value"></tb-list-item>');
    element = $compile(element)(scope);
    scope.$apply();
  };

  it('should show message if listItem is not present on scope', function () {
    element = angular.element('<tb-list-item></tb-list-item>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('attributes listItem and listItemValue are required on the scope, add list-item and list-item-vlue attributes.');
  });

  it('should show message if listItemValue is not present on scope', function () {
    element = angular.element('<tb-list-item></tb-list-item>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('attributes listItem and listItemValue are required on the scope, add list-item and list-item-vlue attributes.');
  });

  it('should render text value if value field type id text', function () {
    scope.value = {
      sections: {
        section_1: {
          field_1: {
            value: 'text value',
            field: getField('Field title', 'text')
          }
        }
      }
    };

    scope.fieldItem = {
      name: 'Field title changed',
      key: 'sections.section_1.field_1'
    };

    compileListItem();
    expect(element.text()).toBe('text value');
  });
});
