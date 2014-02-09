define(['./module'], function (filters) {
	'use strict';
	filters.filter('evenMonth', function() {
		return function(input, attr, specifyYear) {

			var output = [], year, month, publish;

			angular.forEach(input, function(item) {

				if(publish = item[attr]) {
					year = parseInt(publish / 10000);
					month = parseInt((publish % 10000) / 100);
					console.info(year, month);
					if(!specifyYear || specifyYear && specifyYear == year) {
						month % 2 == 0 && output.push(item);
					}
				}
			});

			return output;
		}
	});
});