'use strict';

angular.module('theBossApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, navbarSrv) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    $scope.modules = [];
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    //Load user's modules
    navbarSrv.getLoggedUserModules().then(function(modules) {
      $scope.modules = modules;
    });

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
