/* global define */
define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('albumController', function($scope, $rootScope, $routeParams, $timeout, playerService, albumAPI) {
		$rootScope.title = "专辑";
		$rootScope.state = "album";

		albumAPI.fetchById($routeParams.id).then(function(ret) {
			$scope.songs = ret.songs;
			$scope.title = ret.name;
		});

		$scope.playAll = function() {
			$location.path('#/player/');
		};

		$scope.add = function(music) {
			music.addClass = 'bling';
			playerService.add(music);
			$timeout(function() {
				music.addClass = '';
			}, 1000);
		};
	});
});