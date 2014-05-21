/* global define */
define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('playerController', ['$scope', '$rootScope', '$window', '$interval', '$http', '$location', '$routeParams', 'playerService', 'userAPI', 'music',
	function ($scope, $rootScope, $window, $interval, $http, $location, $routeParams, playerService, userAPI, music) {

		var progressPassedEl,
			progressWidth = 0,
			intervalId,
			playList,
			info = {};

		$rootScope.title = '播放器';
		$rootScope.state = 'player';

		$scope.empty = true;

		$scope.lyric = {};
		$scope.music = {};

		$scope.track = {
			cover: '',
			degrees: 0,
			sub: $routeParams.sub == 'lyric' ? 'lyric' : 'cover'
		};
		
		//播放列表
		$scope.playList = [];

		$scope.player = {

			playing: true,

			play: function() {

				if(this.playing) {
					playerService.pause();
				}
				else {
					playerService.play();
				}

				this.playing = !this.playing;

			},
			next: function() {
				var nextSong = playerService.next();
			},
			previous: function() {
				var previousSong = playerService.previous();
			}
		};

		$scope.progress = {

			musicProgress: 0,

			touchProgress: function($event) {
				playerService.pause();
				$event.gesture.preventDefault();
				progressPassedEl = angular.element(document.getElementById('progress_passed'));
				progressWidth = progressPassedEl[0].clientWidth;
			},

			dragProgress: function($event) {
				$event.gesture.preventDefault();
				var currentWidth = progressWidth + $event.gesture.deltaX;
				progressPassedEl.css('width', progressWidth + $event.gesture.deltaX + 'px');

				return currentWidth;

				// return passedEl;
			},

			releaseProgress: function($event) {
				playerService.updateProgress(this.dragProgress($event) * 100 / $window.innerWidth);
				playerService.play();
			}
		};

		$scope.goAlbum = function() {
			if($scope.music && angular.isDefined($scope.music.album))
				$location.path('/album/' + $scope.music.album);
		};

		$scope.addFav = function() {
			//TODO
			userAPI.saveFav(1);
		};

		playerService.onUpdate(function(progress, time) {
			$scope.$apply(function() {
				$scope.progress.musicProgress = progress + '%';
				$scope.lyric.time = time;
			});
		});

		playerService.onPlay(function(progress, time) {
			$scope.track.cover = $rootScope.apiHost + '/data/artist/' + music.artist + '.jpg';
		});

		if(music) {
			$scope.music = music;
			playerService.play(music);

			$http.get($rootScope.apiHost + '/' + music.lyric).success(function(data) {
				console.info(arguments);
				$scope.lyric.src = data;
			});
		}

		info = playerService.getPlayerInfo();

		if(info.list.length) {
			$scope.empty = false;

			if(!music) {
				$scope.music = music = info.list[info.current];

				$http.get($rootScope.apiHost + '/' + music.lyric).success(function(data) {
					$scope.lyric.src = data;
				});
			}

		}

		$scope.progress.musicProgress = info.progress + '%';
		$scope.lyric.time = info.time;
		$scope.track.cover = $rootScope.cover;


		//使用$interval可以省去$apply操作
		intervalId = $interval(function() {
	        if($scope.player.playing) updateLP();
	    }, 50);

	    function updateLP() {
	    	$scope.track.degrees = ($scope.track.degrees + 10) % 360;
	    }

	    $scope.$on('$destroy', function () {
	    	$interval.cancel(intervalId);
		});

	}]);
});