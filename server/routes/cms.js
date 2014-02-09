//author stefan
var DB = require('./db'),
	db;

exports.findSliders = function(req, res) {
	res.json([
		{
			img: 'data/slider/slider1.jpg',
			id: ''
		},
		{
			img: 'data/slider/slider2.jpg',
			id: '#'
		},
		{
			img: 'data/slider/slider3.jpg',
			id: '#'
		}
	]);
};

exports.findHots = exports.findNews = function(req, res) {
	db = DB.getDB();
	var artistIdArr = [];
	db.collection('songs', function(err, collection) {
        collection.find().toArray(function(err, items) {

        	db.collection('artists', function(err, collection) {
	        	items.forEach(function(item) {
	        		artistIdArr.push(item.artist); 
	        	});

	        	collection.find({id: {$in: artistIdArr}}).toArray(function(err, ret) {

	        		items.forEach(function(item, index) {
		        		ret.forEach(function(retItem) {
		        			if(retItem['id'] == item.artist) {
		        				item.artistName = retItem['name'];
		        			}
		        		})
		        	});

		        	res.json(items);
	        	});
	        });
        });
    });
};