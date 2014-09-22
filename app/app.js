angular.module('GithubExplorer', [
  'ngRoute',
	'Home',
  'Dashboard'
]).config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});
