define(['./module'], function (services) {
	'use strict';

	//Music API
	services.factory('musicAPI', function($resource, $q, $rootScope) {

		var resource = $resource($rootScope.apiHost + '/music/:id', {
			id: '@id'
		});

		return {
			fetchAll: function() {
				var d = $q.defer();

				resource.query(function(musics) {
					d.resolve(musics);
				}, function() {
					d.reject('Can not get musics!');
				});

				return d.promise;
			},

			fetchById: function(id) {

				var d = $q.defer();

				resource.get({id: id}, function(music) {
					d.resolve(music);
				}, function() {
					d.reject('Can not get music!');
				});

				return d.promise;
			}
		};
	})
	//artist API
	.factory('artistAPI', function($resource, $q, $rootScope) {

		var resource = $resource($rootScope.apiHost + '/artist/:id', {
			id: '@id'
		});

		return {
			fetchAll: function() {
				var d = $q.defer();

				resource.query(function(artists) {
					d.resolve(artists);
				}, function() {
					d.reject('Can not get artists!');
				});

				return d.promise;
			},

			fetchById: function(id) {

				var d = $q.defer();

				resource.get({id: id}, function(artist) {
					d.resolve(artist);
				}, function() {
					d.reject('Can not get artist!');
				});

				return d.promise;
			}
		};
	})
	//album API
	.factory('albumAPI', function($resource, $q, $rootScope) {

		var resource = $resource($rootScope.apiHost + '/album/:id', {
			id: '@id'
		});

		return {
			fetchAll: function() {
				var d = $q.defer();

				resource.query(function(albums) {
					d.resolve(albums);
				}, function() {
					d.reject('Can not get albums!');
				});

				return d.promise;
			},

			fetchById: function(id) {

				var d = $q.defer();

				resource.get({id: id}, function(album) {
					d.resolve(album);
				}, function() {
					d.reject('Can not get album!');
				});

				return d.promise;
			}
		};
	})
	//search API
	.factory('searchAPI', function($resource, $q, $rootScope) {
		var host = $rootScope.apiHost + '/',
			buildQuery = function(o) {
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
				var d = $q.defer();
				if(o.type) o.type = mapType(o.type);

				$resource(host + 'search' + '?' + buildQuery(o), {}).query(function(musics) {
					d.resolve(musics);
				}, function() {
					d.reject('Can not search anything!');
				});

				return d.promise;
			}
		};
	})
	//CMS API
	.factory('cmsAPI', function($resource, $q, $rootScope) {

		var host = $rootScope.apiHost + '/';

		return {

			fetchSliders: function() {
				var d = $q.defer();

				$resource(host + 'cms/slider', {}).query(function(sliders) {
					angular.forEach(sliders, function(item) {
						item.img = host + item.img;
					});
					d.resolve(sliders);
				}, function() {
					d.reject('Can not get sliders!');
				});

				return d.promise;
			},

			fetchHots: function(id) {

				var d = $q.defer();

				$resource(host + 'cms/hot', {}).query(function(music) {
					d.resolve(music);
				}, function() {
					d.reject('Can not get hosts!');
				});

				return d.promise;
			},

			fetchNews: function(id) {

				var d = $q.defer();

				$resource(host + 'cms/new', {}).query(function(music) {
					d.resolve(music);
				}, function() {
					d.reject('Can not get news!');
				});

				return d.promise;
			}
		};
	});
});