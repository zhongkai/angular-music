/* global define */
define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('userController', ['$scope', '$rootScope', 'favs', function($scope, $rootScope, favs) {
		$rootScope.title = "个人中心";
		$rootScope.state = "user";
		$scope.favs = favs;
	}]);
});