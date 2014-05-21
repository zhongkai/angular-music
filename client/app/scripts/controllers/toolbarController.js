define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('toolbarController', ['$scope', '$rootScope', '$window', '$timeout',
	function($scope, $rootScope, $window, $timeout) {
		$scope.back = function() {
			$rootScope.slide = 'slide-right';
			$timeout(function() {
				$rootScope.slide = 'slide-left';
			}, 250);
			$window.history.back();
		};
	}]);
});