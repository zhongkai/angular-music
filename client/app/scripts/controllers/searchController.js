/* global define */
define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('searchController', ['$scope', '$rootScope', '$http', '$location', 'playerService', 'orderByFilter',
	function($scope, $rootScope, $http, $location, playerService, orderByFilter) {

		$rootScope.title = '搜索';
		$rootScope.state = 'search';

		$scope.select = {
			items: ['歌曲', '歌手', '专辑'],
			selected: '歌曲',
			expand: false
		};

		$scope.keyword = '';

		$scope.query = function() {
			if($scope.keyword) {
				$http.get($rootScope.apiHost + '/search?key=' + $scope.keyword + '&type=' + 
					$scope.select.items.indexOf($scope.select.selected)).success(function(rets) {
					$scope.rets = rets;
				});
			}
		};

		$scope.add = function(music) {
			playerService.add(music);
		};

		$scope.goResult = function(ret) {
			if($scope.select.selected == '歌曲') {
				$location.path('/player/' + ret.id);
			}
			else if($scope.select.selected == '歌手') {
				$location.path('/artist/' + ret.id);
			}
			else if($scope.select.selected == '专辑') {
				$location.path('/album/' + ret.id);
			}
		}

		// $scope.$watch('select.selected', function(val) {
		// 	if(val == '歌曲') {
		// 		$scope.rets = orderByFilter($scope.rets, '-publish');
		// 	}
		// 	else if(val == '专辑') {
		// 		$scope.rets = orderByFilter($scope.rets, '+publish');
		// 	}
		// });

	}]);
});