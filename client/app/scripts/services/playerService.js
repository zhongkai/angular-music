define(['./module'], function (services) {
	'use strict';
	services.factory('playerService', function($rootScope) {
		var audio = new Audio,
			player,
			playList = [],
			playing = false,
			current = 0,
			updateCBArray = [],
			playCBArray = [];

		player = {

			play: function(song) {
				if(song) {
					playList = [song];
					current = 0;
					audio.src = $rootScope.apiHost + '/' + song.url;
				}
				else if (playList[current].url != audio.src) {
					song = playList[current];
					audio.src = $rootScope.apiHost + '/' + song.url;
				}

				if(song) {
					console.info(song);
					angular.forEach(playCBArray, function(cb) {
						cb.call(player, song, 0);
					});
					$rootScope.cover = $rootScope.apiHost + '/data/artist/' + song.artist + '.jpg';
				}

				audio.play();
				playing = true;
				$rootScope.playEmpty = false;
			},

			pause: function() {
				if (playing) {
					audio.pause();
					playing = false;
				}
			},

			next: function() {
				if (!playList.length || playList.length <= current + 1) return false;
				playing = true;
				current++;
				player.play();
				return playList[current];
			},

			previous: function() {
				if (!playList.length || current <= 0) return false;
				playing = true;
				current--;
				player.play();
				return playList[current];
			},

			add: function(songs) {
				if(!songs) return;
				var init = false;
				if(!angular.isArray(songs)) songs = [songs];
				if(!playList.length) init = true;
				playList = playList.concat(songs);

				if(init) player.play();
			},

			onUpdate: function(cb) {
				angular.isFunction(cb) && updateCBArray.indexOf(cb) == -1 && updateCBArray.push(cb);
			},

			onPlay: function(cb) {
				angular.isFunction(cb) && playCBArray.indexOf(cb) == -1 && playCBArray.push(cb);
			},

			updateProgress: function(progress) {
				progress = Math.max(0, Math.min(progress, 100));
				audio.currentTime = audio.duration * progress / 100;
			},

			getPlayerInfo: function() {
				return {
					list: playList,
					playing: playing,
					progress: audio.currentTime ? audio.currentTime * 100 / audio.duration : 0,
					time: audio.currentTime || 0,
					current: current
				};
			}
		};

		angular.element(audio).on('timeupdate',function() {
			angular.forEach(updateCBArray, function(cb) {
				cb.call(player, (audio.currentTime * 100 / audio.duration).toFixed(2), audio.currentTime);
			});
		}).on('ended', function() {
			player.next();
		});

		return player;
	});
});