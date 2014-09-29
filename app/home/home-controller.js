'use strict';

angular.module('Home').controller('HomeCtrl', function($scope, $location) {
	$scope.showAllStarred = function() {
    $location.search('username', $scope.username).path('/dashboard');
  };
});
