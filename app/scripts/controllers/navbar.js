'use strict';

/**
 * @ngdoc function
 * @name honeydoApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the honeydoApp
 */
angular.module('honeydoApp')
  .controller('NavbarCtrl',['$scope', '$location', 'Auth', '$timeout', function ($scope, $location, Auth, $timeout) {
    $scope.menu = [{
      'title': '<i class="glyphicon glyphicon-cog"></i>',
      'link': '/settings',
      'tooltip': 'Settings'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      if( typeof route !== 'object') {
        return route === $location.path();
      } else {
        for (var prop in route) {
          if(route[prop] === $location.path()) {
            return true;
          }
        }
      }
    };

    // Initialize Bootstrap Tooltip plugin
    $timeout(function() {
      angular.element('[data-toggle="tooltip"]').tooltip();
    });
  }]);
