//author stefan
var DB = require('./db'),
	db;

exports.search = function(req, res) {
    db = DB.getDB();
	var keyword = req.query.key,
        type = +req.query.type,
        artist = +req.query.artist,
        o = {}, regexp;

    if(keyword) regexp = new RegExp('.*' + keyword + '.*');

    if(artist) o.artist = artist;

    if(type == 1) {
        db.collection('artists', function(err, collection) {

            if(keyword) o.name = regexp;

            collection.find(o).toArray(function(err, items) {
                res.json(items);
            });
        });
    }
    else if(type == 2) {
        db.collection('albums', function(err, collection) {

            if(keyword) o.name = regexp;

            collection.find(o).toArray(function(err, items) {
                res.json(items);
            });
        });
    }
    else {
        db.collection('songs', function(err, collection) {

            if(keyword) o.title = regexp;

            collection.find(o).toArray(function(err, items) {
                res.json(items);
            });
        });
    }
	
};