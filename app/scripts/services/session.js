'use strict';

angular.module('honeydoApp')
  .factory('Session',['$resource', function ($resource) {
    return $resource('/api/session/');
  }]);
