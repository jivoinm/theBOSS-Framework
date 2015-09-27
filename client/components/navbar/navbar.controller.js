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
    $scope.currentUser = Auth.getCurrentUser();

    //Load user's modules
    navbarSrv.getLoggedUserModules().then(function(modules) {

      angular.forEach(modules, function(module, i){
        module.expanded = false;
        module._forms = module._forms;
      });
      $scope.modules = modules;
    });

    $scope.hasForms = function(item){
      return item._forms.length > 0;
    };

    $scope.moduleForms = function(item){
      return item._forms;
    };

    $scope.loadForm = function (module, formId) {
      navbarSrv.getForm(module, formId).then(function (form) {
        $scope.form = form;
      });
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });
