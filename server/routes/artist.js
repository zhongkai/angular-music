//author stefan
var DB = require('./db'),
	db;

exports.findById = function(req, res) {
    db = DB.getDB();
	var id = +req.params.id;
	db.collection('artists', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            res.json(item);
        });
    });
};

exports.findAll = function(req, res) {
    db = DB.getDB();
	db.collection('artists', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.json(items);
        });
    });
};