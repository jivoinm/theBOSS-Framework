'use strict';

describe('Directive: fieldDetails', function () {

  // load the directive's module and view
  beforeEach(module('theBossApp'));
  beforeEach(module('components/directives/formDetails/formDetails.html'));

  var element, scope;
  var $httpBackend;
  beforeEach(inject(function ($rootScope, $injector) {
    scope = $rootScope.$new();
    scope.form = {
      name: 'Form1',
      sections: [
        {
          name: 'Section 1',
          key: 'section_1',
          fields: [
            {
              title: 'Field 1.1',
              key: 'field_1_1',
              type: 'number',
              default_value: '',
              require: true,
              position: 0
            }, {
              title: 'Field 1.2',
              key: 'field_1_2',
              type: 'number',
              default_value: '',
              require: true,
              position: 0
            }
          ]
        },
        {
          name: 'Section 2',
          key: 'section_2',
          fields: [
            {
              title: 'Field 2.1',
              key: 'field_2_1',
              type: 'text',
              default_value: '',
              require: true,
              position: 0
            }, {
              title: 'Field 2.2',
              key: 'field_2_2',
              type: 'text',
              default_value: '',
              require: true,
              position: 0
            }
          ]
        }
        ]
    };
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('app/main/main.html').respond(200, '');
  }));

  it('should show the missing field attribute message', inject(function ($compile, $templateCache) {
    element = angular.element('<form-details></form-details>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('form-details directive requires form-value and form attribute');
  }));

  it('should not show the missing field attribute message', inject(function ($compile) {
    scope.field={};
    element = angular.element('<form-details form="form" form-value="field"></form-details>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).not.toBe('form-details directive requires form-value and form attribute');
  }));  

  it('should render form sections', inject(function ($compile) {
    scope.formValue={
      _id:'asd'
    };
    element = angular.element('<form-details form="form" form-value="formValue"></form-details>');
    element = $compile(element)(scope);
    scope.$apply(); 
    expect(element.text()).toContain('Section 2');
  })); 

  it('should render form value', inject(function ($compile) {
    scope.formValue={
      _id:'asd',
      sections: {
        section_1: {
          field_1_1: {
            value: 2
            },
          field_1_2: {
            value: 2
          }
        }
      }
    };
    element = angular.element('<form-details form="form" form-value="formValue"></form-details>');
    element = $compile(element)(scope);
    scope.$apply(); 
    expect(element.find("dd")[0].innerText).toBe('2');
  }));
}); 