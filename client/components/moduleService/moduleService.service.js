'use strict';

angular.module('theBossApp')
  .service('moduleService', function ($resource) {
    return $resource('/api/modules/:listController:id/:docController', {
      id: '@_id',
      listController: '@listController',
      docController: '@docController'
    },
    {
      myModules: {
        method: 'GET',
        params: {
          listController:'my'
        }
      },
     forms: {
       method: 'GET',
       params: {
         id:'@_id',
         docController: 'forms'
       }
     },
     form: {
       method: 'GET',
       params: {
         id:'@_id',
         docController: 'forms'
       }
     }
	  });
  });
