'use strict';

angular.module('theBossApp')
  .service('navbarSrv', function (moduleService, $q, $cookieStore) {
    return {
      getLoggedUserModules: function (callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        var modules = $cookieStore.get('modules');
        if(modules) {
          deferred.resolve(modules);
        } else{
          moduleService.myModules(function(data) {
              $cookieStore.put('modules', data);
              deferred.resolve(data);
              return cb();
            },
            function(err) {
              deferred.reject(err);
              return cb(err);
            });
        }
        return deferred.promise;
      }
    };
  });
