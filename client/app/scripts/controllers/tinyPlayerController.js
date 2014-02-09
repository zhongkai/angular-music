/* global define */
define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('tinyPlayerController', function ($scope, $rootScope, $window, $interval, $http, playerService) {

		$scope.player = {

			playing: true,

			play: function() {
				if($rootScope.playEmpty) return;

				if(this.playing) {
					playerService.pause();
				}
				else {
					playerService.play();
				}

				this.playing = !this.playing;

			},
			next: function() {
				if($rootScope.playEmpty) return;
				var nextSong = playerService.next();
			},
			previous: function() {
				if($rootScope.playEmpty) return;
				var previousSong = playerService.previous();
			}
		};

	});
});