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
    $scope.user = User.get() || {};

    $scope.changeEmail = function(form) {
      $scope.submitted = true;

      if( $scope.user.newEmail !== $scope.user.newEmailConfirm ) {
        form.newEmail.$setValidity('mongoose', false);
        $scope.errors.changeEmailError = 'Email addresses do not match. Please try again.';
        return;
      } else {
        form.newEmail.$setValidity('mongoose', true);
        $scope.errors.other = '';
      }

      if(form.$valid) {
        Auth.changeEmail( $scope.user.newEmail )
        .then( function(user) {
          if( user ) {
            $scope.user = user;
            $scope.changeEmailMessage = 'Email successfully changed.';
            setTimeout(function() {
              angular.element('#edit-email').collapse('hide');
            }, 2000);
          }
        })
        .catch( function() {
          form.newEmail.$setValidity('mongoose', false);
          $scope.errors.changeEmailError = 'Unknown error';
        });
      }
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
          setTimeout(function() {
            angular.element('#edit-password').collapse('hide');
          }, 2000);
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.changePasswordError = 'Incorrect password';
        });
      }
		};
  }]);
