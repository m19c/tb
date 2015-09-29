var module = angular.module('tb', []);
var global = window;

module.controller('MainController', function($scope) {
  $scope.context = global.context;
});

module.directive('tbTree', function() {
  return {
    restrict: 'E',
    scope: {
      context: '=context'
    },
    template: `

    `,
    link: function link($scope, $element, args) {
    }
  };
});

angular.bootstrap(document, ['tb']);