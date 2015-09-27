'use strict';

angular.module('theBossApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forms', {
        url: '/forms/:formId',
        templateUrl: 'app/forms/forms.html',
        controller: 'FormsListCtrl'
      })
      .state('forms.list', {
        url: '/list',
        templateUrl: 'app/forms/list/formsList.html',
        controller: 'FormsListCtrl'
      })
      .state('forms.new', {
        url: '/new',
        templateUrl: 'app/forms/form/forms.html',
        controller: 'FormsCtrl'
      })
      .state('forms.edit', {
        url: '/:valueId',
        templateUrl: 'app/forms/form/forms.html',
        controller: 'FormsCtrl'
      });

  });
