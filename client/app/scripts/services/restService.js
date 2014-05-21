define(['./module'], function (services) {
	'use strict';

	//Music API
	services.factory('musicAPI', ['$resource', '$q', '$rootScope', function($resource, $q, $rootScope) {

		var host = $rootScope.apiHost;

		var resource = $resource(host + '/music/:id', {
			id: '@id'
		});

		return {
			fetchAll: function() {
				return resource.query();
			},

			fetchById: function(id) {
				return resource.get({id: id});
			}
		};
	}])
	//artist API
	.factory('artistAPI', ['$resource', '$q', '$rootScope', function($resource, $q, $rootScope) {
		var host = $rootScope.apiHost;

		var resource = $resource(host + '/artist/:id', {
			id: '@id'
		});

		return {
			fetchAll: function() {
				return resource.query();
			},

			fetchById: function(id) {
				return resource.get({id: id});
			}
		};
	}])
	//user API
	.factory('userAPI', ['$resource', '$q', '$rootScope', function($resource, $q, $rootScope) {

		var host = $rootScope.apiHost;

		var resource = $resource(host + '/user/:userId/fav/:favId', {
			favId: '@id'
		});


		return {
			fetchAllFavs: function(userId) {
				return resource.query({userId: userId});
			},

			saveFav: function(musicId) {
				写死用户id
				var FavResource = $resource(host + '/user/:userId/fav/:favId', {
					userId: 1
				});
				var r = new FavResource({musicId: 1});
				r.musicName = '泡沫';
				r.$save();
			},

			getFav: function(musicId) {
				var FavResource = $resource(host + '/user/:userId/fav/:favId', {
					userId: 1,
					favId: '@id'
				});
				FavResource.get({favId: musicId}, function(favMusic) {
					expect(favMusic instanceof FavResource).toEqual(true);
				});
			}
		};
	}])
	//album API
	.factory('albumAPI', ['$resource', '$q', '$rootScope', function($resource, $q, $rootScope) {

		var host = $rootScope.apiHost;

		var resource = $resource(host + '/album/:id', {
			id: '@id'
		});

		return {
			fetchAll: function() {
				return resource.query();
			},

			fetchById: function(id) {
				return resource.get({id: id});
			}
		};
	}])
	//search API
	.factory('searchAPI', ['$resource', '$q', '$rootScope', function($resource, $q, $rootScope) {

		var host = $rootScope.apiHost;

		var buildQuery = function(o) {
				var ret = [], i;
				for(i in o) {
					ret.push(i + '=' + o[i]);
				}
				return ret.join('&');
			},
			mapType = function(type) {
				return ['music', 'artist', 'album'].indexOf(type);
			};

		return {
			search: function (o) {
				return $resource(host + '/search' + '?' + buildQuery(o), {}).query();
			}
		};
	}])
	//CMS API
	.factory('cmsAPI', ['$resource', '$q', '$rootScope', function($resource, $q, $rootScope) {

		var host = $rootScope.apiHost;

		return {

			fetchSliders: function() {
				return $resource(host + '/cms/slider').query();
			},

			fetchHots: function(id) {
				return $resource(host + '/cms/hot', {}).query();
			},

			fetchNews: function(id) {
				//如下是自定义方法的例子
				// var Res = $resource('/resource/:id', null,
				// {
				// 	'update': {
				// 		method:'PUT',		
				// 		params: {
				// 			tag: 2
				// 		}
				// 	}
				// });
				// var res = Res.update({id: 1}, {key1: 1, key2: 2});
				return $resource(host + '/cms/new', {}).query();
			}
		};
	}]);
});