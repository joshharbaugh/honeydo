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
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Settings',
      'link': '/settings'
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
