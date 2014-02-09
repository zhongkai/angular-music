/* global define */
define(['./module'], function (directives) {
	'use strict';
	directives.directive('lyric', function () {
		return {
			template: '<div class="lyric-list"></div>',
			restrict: 'EA',
			replace: true,
			scope: {
				source: '@',
				time: '@'
			},
			link: function (scope, element, attrs) {

				var src = null;

				scope.$watch("source", function(value) {
					var lis = [];
					src = JSON.parse(value);
					src.forEach(function(v) {
						lis.push('<li>' + v.content + '</li>');
					});
					element.html('<ul>' + lis.join('') + '</ul>')
				});

				scope.$watch("time", function(value) {
					var t, index = 0, ulEl,
						lineHeight, light = false;

					if(src) {
						ulEl = element.children().eq(0);
						lineHeight = ulEl.children().eq(0)[0].clientHeight;
						src.forEach(function(v) {
							if(+v.time > +value && !light) {
								ulEl.css('top',
									-lineHeight * index + element[0].clientHeight / 2 + 'px');
								ulEl.children().eq(index - 1).css({
									background: '#555',
									color: '#fff'
								});
								light = true;
							}
							else {
								ulEl.children().eq(index).css({
									background: 'transparent',
									color: '#000'
								});
							}
							index++;
						});
					}

				});
			}
		};
	});
});