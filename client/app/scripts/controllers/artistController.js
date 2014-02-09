/* global define */
define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('artistController', function($scope, $rootScope, artist, musics, albums) {

		$rootScope.title = '歌手-' + artist.name;
		$rootScope.state = 'artist';

		$scope.artist = artist;
		$scope.artist.avatar = $rootScope.apiHost + '/data/artist/' + artist.id + '.jpg';
		$scope.musics = musics;
		$scope.albums = albums;
		
	});
});