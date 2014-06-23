'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('honeydoApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/session')
      .respond('Not Found');
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should set sending to false on the scope', function () {
    expect(scope.sending).toBeUndefined();
    $httpBackend.flush();
    expect(scope.sending).toBe(false);
  });
});
