'use strict';

angular.module('Github', []).service('Github', function($http) {
  var root = 'https://api.github.com/';

  this.getStarredRepos = function(username) {
    return $http.get(root + 'users/' + username + '/starred?per_page=100');
  };
});