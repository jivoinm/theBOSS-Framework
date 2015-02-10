'use strict';

angular.module('theBossApp')
  .service('moduleService', function ($resource) {
    return $resource('/api/modules/:id/:controller', {
      id: '@_id'
    },
    {
      myModules: {
        method: 'GET',
        isArray: true,
        params: {
          id:'my'
        }
      },
     forms: {
       method: 'GET',
       isArray: true,
       params: {
         id:'_id',
         controller: 'form'
       }
     },
     form: {
       method: 'GET',
       params: {
         id:'@_id',
         controller: 'form',
         formid: 'formid'
       }
     }
	  });
  });
