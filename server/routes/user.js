//author stefan
//这里为了简便我们将所有的用户都指向了名为stefan的用户信息
var DB = require('./db'),
	db;

exports.findFavs = function(req, res) {
	db = DB.getDB();
	var id = +req.params.id, artistIdArr = [];
	db.collection('users', function(err, collection) {
        collection.findOne({'id': 1}, function(err, item) {
            if(!item.songs) {
            	res.json([]);
            }
            else {
            	db.collection('songs', function(err, collection) {
			        collection.find({id: {$in: item.songs}}).toArray(function(err, items) {
                        items.forEach(function(item) {
                            artistIdArr.push(item.artist); 
                        });
                        db.collection('artists', function(err, collection) {
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
            }
        });
    });
};

exports.findFavById = function(req, res) {
	db = DB.getDB();
	var id = +req.params.id,
		favId = +req.params.favId;
	db.collection('users', function(err, collection) {
        collection.findOne({'id': 1}, function(err, item) {
            var songs = item.songs;
            if(songs.indexOf(favId) == -1) {
            	res.end(null);
            }
            else {
            	db.collection('songs', function(err, collection) {
			        collection.findOne({'id': favId}, function(err, item) {
			            res.json(item);
			        });
			    });
            }
        });
    });
};

exports.addFav = function(req, res) {
	db = DB.getDB();
	var id = +req.params.id,
		favId = +req.params.favId;
	db.collection('users', function(err, collection) {
        collection.findOne({'id': 1}, function(err, item) {
            var songs = item.songs;
            if(songs.indexOf(favId) == -1) {
            	songs.push(favId);
            }
            collection.update({'id': 1}, {
            	$set: {songs: songs}
            }, function(err, item) {
            	res.end();
            });
        });
    });
};

exports.deleteFav = function(req, res) {
	db = DB.getDB();
	var id = +req.params.id,
		favId = +req.params.favId;
	db.collection('users', function(err, collection) {
        collection.findOne({'id': 1}, function(err, item) {
            var songs = item.songs,
            	index = songs.indexOf(favId);
            if(index > 0) {
            	songs.splice(index, 1);
            }
            collection.update({'id': 1}, {
            	$set: {songs: songs}
            }, function(err, item) {
            	res.end();
            });
        });
    });
};


