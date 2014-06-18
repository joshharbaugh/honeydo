'use strict';

/**
 * @ngdoc function
 * @name honeydoApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the honeydoApp
 */
angular.module('honeydoApp')
  .controller('NavbarCtrl',['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
    // Initialize Bootstrap Tooltip plugin
    angular.element('[data-toggle="tooltip"]').tooltip();

    $scope.menu = [{
      'title': 'Dashboard',
      'link': '/'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);
