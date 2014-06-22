'use strict';

angular.module('honeydoApp')
  .factory('Twilio',['$resource', function ($resource) {
    return $resource('/api/send', null,
    { //parameters default
      send: {
        method: 'POST',
        params: {}
      }
    });
  }]);
