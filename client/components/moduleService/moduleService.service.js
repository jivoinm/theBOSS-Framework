'use strict';

angular.module('theBossApp')
  .service('moduleService', function ($resource) {
    return $resource('/api/modules/:id/:controller', {
      id: '@_id'
    },
    {
      myModules: {
        method: 'GET',
        params: {
          id:'my'
        }
      }
	  });
  });
