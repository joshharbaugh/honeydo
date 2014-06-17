'use strict';

/**
 * @ngdoc function
 * @name honeydoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the honeydoApp
 */
angular.module('honeydoApp')
  .controller('MainCtrl',['$scope', '$http', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  }]);
