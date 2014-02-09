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
	]).config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl: '../views/home.html',
				controller: 'homeController',
				resolve: {
					sliders: function(cmsAPI) {
						return cmsAPI.fetchSliders();
					},
					hots: function(cmsAPI) {
						return cmsAPI.fetchHots();
					},
					news: function(cmsAPI) {
						return cmsAPI.fetchNews();
					}
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
					music: function(musicAPI, $route) {
						return musicAPI.fetchById($route.current.params.id);
					}
				}
			}).when('/search', {
				templateUrl: '../views/search.html',
				controller: 'searchController'
			}).when('/user', {
				templateUrl: '../views/user.html',
				controller: 'userController'
			}).when('/album/:id', {
				templateUrl: '../views/album.html',
				controller: 'albumController'
			}).when('/artist/:id', {
				templateUrl: '../views/artist.html',
				controller: 'artistController',
				resolve: {
					artist: function(artistAPI, $route) {
						return artistAPI.fetchById($route.current.params.id);
					},
					musics: function(searchAPI, $route) {
						return searchAPI.search({
							type: 'music',
							artist: $route.current.params.id
						});
					},
					albums: function(searchAPI, $route) {
						return searchAPI.search({
							type: 'album',
							artist: $route.current.params.id
						});
					}
				}
			}).otherwise({
				redirectTo: '/home'
			});
		}
	]).run(function($rootScope, $location) {

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
	});
});
