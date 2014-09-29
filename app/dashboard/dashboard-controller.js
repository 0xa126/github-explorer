'use strict';

angular.module('Dashboard').controller('DashboardCtrl', function($scope, $routeParams, Github) {
  Github.getStarredRepos($routeParams.username).then(function(response) {
    $scope.repos = response.data;
    console.log($scope.repos[0]);
  }, function() {
    console.log('Error');
  });
});
