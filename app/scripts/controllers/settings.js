'use strict';

/**
 * @ngdoc function
 * @name honeydoApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the honeydoApp
 */
angular.module('honeydoApp')
  .controller('SettingsCtrl',['$scope', 'User', 'Auth', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};
  }]);
