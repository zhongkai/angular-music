//author stefan
var DB = require('./db'),
	db;

exports.findById = function(req, res) {
    db = DB.getDB();
	var id = +req.params.id;
	db.collection('albums', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {

            db.collection('songs', function(err, collection) {
                collection.find({id: {$in: item.songs}}).toArray(function(err, ret) {

                    item.songs = ret;

                    res.json(item);

                });
            });

        });
    });
};

exports.findAll = function(req, res) {
    db = DB.getDB();
	db.collection('albums', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.json(items);
        });
    });

};