/* global define */
define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('homeController', function($scope, $rootScope, $window, $timeout, sliders, hots, news, playerService) {

		$rootScope.title = '首页';
		$rootScope.state = 'home';

		$scope.sliders = sliders;
        $scope.hots = hots;
        $scope.news = news;

		var currentSlider = 0,
			sliderCount = sliders.length,
			listEl;

		$scope.touchSlider = function($event) {
			$event.gesture.preventDefault();
			listEl = listEl || angular.element($event.target).parent().parent().parent();
		};

		$scope.swipeSlider = function($event) {
			$event.gesture.preventDefault();
			if($event.gesture.direction == "left") {
				slideSliders(currentSlider + 1);
			}
			else {
				slideSliders(currentSlider - 1);
			}
			$event.gesture.stopDetect();
		};

		$scope.dragSlider = function($event) {
			$event.gesture.preventDefault();
			var sliderOffset = -100 * (currentSlider / sliderCount),
            	dragOffset = 100 * $event.gesture.deltaX / ($window.innerWidth * sliderCount);

            //开始和结束的幻灯片添加缓动
            if((currentSlider == 0 && $event.gesture.direction == "right") ||
                (currentSlider == sliderCount - 1 && $event.gesture.direction == "left")) {
                dragOffset *= .5;
            }

            setOffset(dragOffset + sliderOffset);
		}

		$scope.releaseSlider = function($event) {
			$event.gesture.preventDefault();
            if(Math.abs($event.gesture.deltaX) > $window.innerWidth / 3) {
                if($event.gesture.direction == 'left') {
                    slideSliders(currentSlider + 1, true);
                } else {
                    slideSliders(currentSlider - 1, true);
                }
            }
            else {
                slideSliders(currentSlider, true);
            }
		}

		$scope.add = function(music) {
			music.addClass = 'bling';
			playerService.add(music);
			$timeout(function() {
				music.addClass = '';
			}, 1000);
		};

		initSliders();

		angular.element($window).bind("load resize orientationchange", initSliders);

	    function initSliders() {
	    	$scope.sliderWidth = $window.innerWidth;
			$scope.totalSliderWidth = $window.innerWidth * sliderCount;
	    }

	    function resizeSliders() {
	    	$scope.$apply(initSliders);
	    }

	    function slideSliders(dest) {
            currentSlider = Math.min(Math.max(dest, 0), sliderCount - 1);
            setOffset(-((100 / sliderCount) * currentSlider), true)
        }

        function setOffset(percent, animation) {
        	listEl.removeClass('animate');
        	if(animation) {
        		listEl.addClass('animate');
        	}
        	listEl.css("-webkit-transform", "translate3d(" + percent + "%, 0, 0)");
        	listEl.css("transform", "translate3d(" + percent + "%, 0, 0)");
        	//可添加更多浏览器的支持
        }

	});
});