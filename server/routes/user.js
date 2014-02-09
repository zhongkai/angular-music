//author stefan
var DB = require('./db'),
	db;

exports.findFavs = function(req, res) {
	db = DB.getDB();
	db.collection('favorites', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.json(items);
        });
    });
};