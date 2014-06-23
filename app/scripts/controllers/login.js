'use strict';

/**
 * @ngdoc function
 * @name honeydoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the honeydoApp
 */
angular.module('honeydoApp')
  .controller('LoginCtrl',['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  }])

  /**
   * @ngdoc function
   * @name honeydoApp.controller:FacebookAuthCtrl
   * @description
   * # FacebookAuthCtrl
   * Controller of the honeydoApp
   */
  .controller('FacebookAuthCtrl',[function () {
  
    window.location.replace('http://localhost:9000/auth/facebook');
  
  }]);