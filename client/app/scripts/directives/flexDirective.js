/* global define */
define(['./module'], function (directives) {
	'use strict';
	directives.directive('flexbox', function () {
		return {
			template: '<div class="flexbox" ng-transclude></div>',
			restrict: 'EA',
			replace: true,
			transclude: true,
			link: function (scope, element, attrs) {

				var orient = attrs['boxOrient'], //horizontal, vertical
					direction = attrs['boxDirection'], //reverse, normal
					style = {};

				if(orient) {
					style['-webkit-box-orient'] = orient;
					style['-moz-box-orient'] = orient;
					style['-ms-box-orient'] = orient;
					style['box-orient'] = orient;
					style['-webkit-flex-orient'] = orient;
					style['-moz-flex-orient'] = orient;
					style['-ms-flex-orient'] = orient;
					style['flex-orient'] = orient;
				}

				if(direction) {
					style['-webkit-box-direction'] = direction;
					style['-moz-box-direction'] = direction;
					style['-ms-box-direction'] = direction;
					style['flex-direction'] = direction;
					var newDirection = direction == 'reverse' ? 'row-reverse' : 'row';
					style['-webkit-flex-direction'] = newDirection;
					style['-moz-flex-direction'] = newDirection;
					style['-ms-flex-direction'] = newDirection;
					style['flex-direction'] = newDirection;
				}

				element.css(style);
			}
		};
	}).directive('flexitem', ['$interpolate', function ($interpolate) {
		return {
			template: '<div class="flexitem" ng-transclude></div>',
			restrict: 'EA',
			transclude: true,
			replace: true,
			link: function (scope, element, attrs) {
				// var flex = $interpolate(attrs.flex)(scope);

				var flex = attrs.flex;

				if(flex) {
					if(/px$/.test(flex)) {
						element.css({
							'position': 'relative',
							'width': flex
						});
					}
					else {
						element.css({
							'position': 'relative',
							'-webkit-box-flex': flex,
	  						'-moz-box-flex': flex,
	  						'-ms-box-flex': flex,
							'box-flex': flex,
							'-webkit-flex': flex,
	  						'-moz-flex': flex,
	  						'-ms-flex': flex,
	  						'flex': flex,
							//防止元素内容对元素的宽度造成影响
							'width': 0
						});
					}
				}
			}
		};
	}]);
});