/* global define */
define(['./module'], function (directives) {
	'use strict';
	directives.directive('rotate', function () {
		return {
			template: '<div ng-transclude></div>',
			restrict: 'EA',
			transclude: true,
			replace: true,
			scope: {
				// degrees: '@',
				// speed: '@'
				rotateDegrees: '@degrees',
				rotateSpeed: '=speed'

			},
			link: function (scope, element, attrs) {
				//自动旋转
				//speed: 0-停止, 1-slow, 2-normal, 3-fast
				scope.$watch('rotateSpeed', function(value) {
					element.removeClass('rotate-1')
						.removeClass('rotate-2')
						.removeClass('rotate-3');

					if(value > 0) {
						element.addClass('rotate-' + value);
					}
				});

				//受控制的旋转
				scope.$watch('rotateDegrees', function(value) {
					element.css({
						'-moz-transform': 'rotate(' + value + 'deg)',
						'-webkit-transform': 'rotate(' + value + 'deg)',
						'-o-transform': 'rotate(' + value + 'deg)',
						'-ms-transform': 'rotate(' + value + 'deg)'
					});
				});

				//使用$observe方法来监控
				// attrs.$observe('degrees', function(value) {
				// 	element.css({
				// 		'-moz-transform': 'rotate(' + value + 'deg)',
				// 		'-webkit-transform': 'rotate(' + value + 'deg)',
				// 		'-o-transform': 'rotate(' + value + 'deg)',
				// 		'-ms-transform': 'rotate(' + value + 'deg)'
				// 	});
				// });

			}
		};
	});
});