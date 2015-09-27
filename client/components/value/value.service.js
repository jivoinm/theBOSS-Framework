'use strict';

angular.module('theBossApp')
  .service('value',  function ($resource) {
    return $resource('/api/values/:id', {
      id: '@_id'
    });
  });
