/* global define */
define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('userController', function($scope, $rootScope) {
		$rootScope.title = "个人中心";
		$rootScope.state = "user";
		//TODO

		//Simulate

		$scope.favs = [{
			"id": 1,
		    "title": "乌龟",
		    "artist": 'davichi',
		    "url": "music/乌龟.mp3",
		    "publish": 20130710,
		    "lyric": ""
		},
		{
		    "id": 2,
		    "title": "信",
		    "artist": 'davichi',
		    "url": "music/default.mp3",
		    "publish": 20131212,
		    "lyric": ""
		}];
	});
});