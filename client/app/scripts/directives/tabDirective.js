/* global define */
	define(['./module'], function (directives) {
		'use strict';
		directives.directive('tabs', function () {
			return {
				restrict: 'E',
				transclude: true,
				templateUrl: '../../views/tabs.html',
				replace: true,
				scope: {},
				controller: ['$scope', function($scope) {
					$scope.tabs = [];

					$scope.select = function(tab) {
						angular.forEach($scope.tabs, function(tab) {
							tab.selected = false;
						});
						tab.selected = true;
					};

					this.add = function(tab) {
						if ($scope.tabs.length == 0) {
							$scope.select(tab);
						}
						$scope.tabs.push(tab);
					};
				}]
			};
		}).directive('tab', function() {
			return {
				require: '^tabs',
				restrict: 'E',
				replace: true,
				transclude: true,
				template: '<div class="tab" ng-show="selected" ng-transclude></div>',
				scope: {
					title: '@'
				},
				link: function(scope, element, attrs, tabsCtrl) {
					scope.selected = false;
					tabsCtrl.add(scope);
				}
			};
		});
	});