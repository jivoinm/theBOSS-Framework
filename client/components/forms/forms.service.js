'use strict';

angular.module('theBossApp')
  .service('forms', function ($resource) {
    return $resource('/api/forms/:id', {
      id: '@_id'
    }, {
      'values': {
        method: 'GET',
        isArray: false,
        url: '/api/forms/:id/values',
        params: {
            id: '@_id'
        }
      }
    });
});
