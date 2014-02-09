require.config({
	//设置项目所依赖的库文件别名
	paths: {
		// 'jQuery': '../bower_components/jquery/jquery',
		// 'jQueryUI': '../bower_components/jqueryui/ui/jquery-ui',
		'angular': '../bower_components/angular/angular',
		'angularRoute': '../bower_components/angular-route/angular-route',
		'angularTouch': '../bower_components/angular-touch/angular-touch',
		'angularGestures': '../bower_components/angular-gestures/gestures',
		'angularResource': '../bower_components/angular-resource/angular-resource',
		'angularAnimate': '../bower_components/angular-animate/angular-animate',
		'domReady': '../bower_components/requirejs-domready/domReady'
	},
	//把angualrjs当做AMD模块来使用
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angularRoute': {
			deps: ['angular']
		},
		'angularTouch': {
			deps: ['angular']
		},
		'angularGestures': {
			deps: ['angular']
		},
		'angularResource': {
			deps: ['angular']
		},
		'angularAnimate': {
			deps: ['angular']
		}
	}
});

require([
	'angular',
	'domReady',
	// 'jQuery',
	// 'jQueryUI',
	'angularRoute',
	'angularTouch',
	'angularGestures',
	'angularResource',
	'angularAnimate',
	'app'
],
function (angular, domReady) {
	'use strict';

	domReady(function() {
		angular.bootstrap(document, ['ngMusic']);
	});
});