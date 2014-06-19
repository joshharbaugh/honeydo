'use strict';

angular.module('honeydoApp')
  .factory('Todo',['$resource', function ($resource) {
    return $resource('/api/users/me/todos', null,
    { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {}
      },
      query: {
        method: 'GET',
        isArray: true
      },
      delete: {
        method: 'DELETE',
        params: {}
      }
    });
  }]);
