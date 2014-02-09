define(['./module'], function (animations) {
	'use strict';
	animations.animation('.bling', function() {
		return {
			addClass : function(element, className, done) {

				element.css({
					//此处省略多浏览器支持
					'-webkit-animation': 'bling-keyframes .5s linear infinite'
				});
				//动画执行完成调用done参数
				jQuery(element).animate({
					color: 'red'
				}, 500, 'linear', done);

				//可选，动画完毕或者取消时会被调用
				return function(isCancelled) {
					if(isCancelled) {
						jQuery(element).stop();
					}
				};
			},

			removeClass : function(element, className, done) {

				element.css({
					'-webkit-animation': ''
				});
				jQuery(element).animate({
					color: 'black'
				}, 500, 'linear', done);

				//可选，动画完毕或者取消时会被调用
				return function(isCancelled) {
					if(isCancelled) {
						jQuery(element).stop();
					}
				};
			}
		};
	});
});
