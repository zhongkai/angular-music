/* global define */
define([
	'angular',
	'controllers/controllers',
	'directives/directives',
	'filters/filters',
	'services/services',
	'animations/animations'
], function (angular) {
	'use strict';
	return angular.module('ngMusic', [
		'ngRoute',
		'ngTouch',
		'ngAnimate',
		'angular-gestures',
		'ngResource',
		'ngMusic.controllers',
		'ngMusic.directives',
		'ngMusic.services',
		'ngMusic.filters'
		// 'ngMusic.animations'
	]).config(['$routeProvider', '$httpProvider',
		function($routeProvider, $httpProvider) {
			$routeProvider.when('/home', {
				templateUrl: '../views/home.html',
				controller: 'homeController',
				resolve: {
					sliders: ['cmsAPI', function(cmsAPI) {
						return cmsAPI.fetchSliders().$promise;
					}],
					hots: ['cmsAPI', function(cmsAPI) {
						return cmsAPI.fetchHots().$promise;
					}],
					news: ['cmsAPI', function(cmsAPI) {
						return cmsAPI.fetchNews().$promise;
					}]
				}
			}).when('/player', {
				templateUrl: '../views/player.html',
				controller: 'playerController',
				resolve: {
					music: function() {
						return false;
					}
				}
			}).when('/player/:id', {
				templateUrl: '../views/player.html',
				controller: 'playerController',
				resolve: {
					music: ['musicAPI', '$route', function(musicAPI, $route) {
						return musicAPI.fetchById($route.current.params.id).$promise;
					}]
				}
			}).when('/search', {
				templateUrl: '../views/search.html',
				controller: 'searchController'
			}).when('/user/:id', {
				templateUrl: '../views/user.html',
				controller: 'userController',
				resolve: {
					favs: ['userAPI', '$route', function(userAPI, $route) {
						return userAPI.fetchAllFavs($route.current.params.id);
					}]
				}
			}).when('/album/:id', {
				templateUrl: '../views/album.html',
				controller: 'albumController'
			}).when('/artist/:id', {
				templateUrl: '../views/artist.html',
				controller: 'artistController',
				resolve: {
					artist: ['artistAPI', '$route', function(artistAPI, $route) {
						return artistAPI.fetchById($route.current.params.id).$promise;
					}],
					musics: ['searchAPI', '$route', function(searchAPI, $route) {
						return searchAPI.search({
							type: 'music',
							artist: $route.current.params.id
						}).$promise;
					}],
					albums: ['searchAPI', '$route', function(searchAPI, $route) {
						return searchAPI.search({
							type: 'album',
							artist: $route.current.params.id
						}).$promise;
					}]
				}
			}).otherwise({
				redirectTo: '/home'
			});

			//修改默认配置的示例
			$httpProvider.defaults.cache = true;
			$httpProvider.defaults.headers.common.Authentication = 'Basic YmVlcDpib29w';
		}
	]).run(['$rootScope', '$location', '$q', function($rootScope, $location, $q) {

		$rootScope.apiHost = 'http://localhost:1987';
		$rootScope.playEmpty = true;
		$rootScope.slide = 'slide-left';

		$rootScope.back = function() {
			$rootScope.slide = 'slide-right';
			$window.history.back();
        }
        $rootScope.go = function(path){
			$rootScope.slide = 'slide-left';
			$location.url(path);
        }

        //以下代码用于说明$q异步服务的作用
        // function a() {
        // 	var d = $q.defer();
        // 	setTimeout(function() {
        // 		console.info('a');
        // 		d.resolve('a');
        // 	}, 100);
        // 	return d.promise;
        // }
        // function b() {
        // 	console.info(arguments);
        // 	var d = $q.defer();
        // 	setTimeout(function() {
        // 		console.info('b');
        // 		d.resolve('b');
        // 	}, 100);
        // 	return d.promise;
        // }
        // function c() {
        // 	console.info(arguments);
        // 	var d = $q.defer();
        // 	setTimeout(function() {
        // 		console.info('c');
        // 		d.resolve('c');
        // 	}, 100);
        // 	return d.promise;
        // }

        // var d = $q.defer();

        // a().then(b).then(c).then(function() {
        // 	console.info(arguments);
        // 	console.info('success');
        // });

	}]);
});
