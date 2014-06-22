'use strict';

/**
 * @ngdoc function
 * @name honeydoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the honeydoApp
 */
angular.module('honeydoApp')
  .controller('MainCtrl',['$scope', 'Todo', 'Auth', '$log', 'Twilio', '$timeout', function ($scope, Todo, Auth, $log, Twilio, $timeout) {

    $scope.sending = false;

    $timeout(function() {
      $scope.isLoggedIn = Auth.isLoggedIn();

      if( $scope.isLoggedIn ) {
        $scope.todos = Todo.query();
      } else {
        $scope.todos = [];
      }
    });
    
    $scope.addTodo = function(todo) {
      todo.info = '';

      var $resource = Todo.save(todo).$promise;
      $resource.then(function() {
        $scope.todos = Todo.query();
        $scope.todo.name = '';
      })
      .catch( function(err) {
        if(err) {
          $log.log(err);
        }
      });
    };

    $scope.sendSMS = function(todos) {
      $scope.sending = true;

      var phoneNumber = this.phoneNumber;
      var payload = {
        'todos': todos,
        'to': phoneNumber
      };

      Twilio.send(payload).$promise
      .then(function(response) {
        // resolved
        if(!response.errorCode) {
          $log.log('response', response);
          $scope.sending = false;
          $scope.alert = {
            'title': 'Huzzah!',
            'message': 'Your to-do list was sent to ' + phoneNumber,
            'type': 'success'
          };
        } else {
          $log.warn(response);
          $scope.sending = false;
        }
      }, function(err) {
        // error
        if(err) {
          $log.error(err);
          $scope.sending = false;
        }
      })
      .catch(function(err) {
        if(err) {
          $log.error(err);
          $scope.sending = false;
        }
      });
    };

  }]);
