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
      }
	  });
  });
