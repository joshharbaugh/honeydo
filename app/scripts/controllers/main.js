'use strict';

/**
 * @ngdoc function
 * @name honeydoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the honeydoApp
 */
angular.module('honeydoApp')
  .controller('MainCtrl',['$scope', 'Todo', function ($scope, Todo) {

    $scope.todos = Todo.query();
    
    $scope.addTodo = function(todo) {
      todo.info = '';

      var $resource = Todo.save(todo).$promise;
      $resource.then(function() {
        $scope.todos = Todo.query();
        $scope.todo.name = '';
      })
      .catch( function(err) {
        if(err) {
          console.log(err);
        }
      });
    };

  }]);
