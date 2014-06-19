'use strict';

angular.module('honeydoApp')

  /**
   * Removes server error when user updates input
   */
  .directive('todo',['$timeout', 'Todo', function ($timeout, Todo) {
    return {
      restrict: 'A',
      require: 'ngModel',
      templateUrl: 'partials/todo.html',
      link: function(scope, element, attrs, ngModel) {

        element.on('change', function() {
          $timeout(function() {
            var todo = ngModel.$viewValue;
            
            try {
              // Update todo
              Todo.update(todo).$promise
              .then( function() {
                var checked = element[0].firstChild.firstElementChild.checked;
                if(checked) {
                  element.find('input[type="text"]').css({'text-decoration': 'line-through', 'color': '#ccc'});
                }
              })
              .catch( function(err) {
                err = err.data;
                scope.errors = {};
              });
            } catch(e) {}
          });
        });

        scope.remove = function(todo) {
          $timeout(function() {
            Todo.delete(todo).$promise
            .then(function(response) {
              if(response.success === 'ok') {
                scope.$parent.todos = Todo.query();
              }
            })
            .catch(function(err) {
              err = err.data;
              scope.errors = {};
            });
          });
        };

      }
    };
  }]);