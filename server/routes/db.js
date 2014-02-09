var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    fs = require('fs'),
	path = require('path'),
	async = require('async'),
	db;

var dataPath = path.join(__dirname, '../data/database')

var mongoClient = new MongoClient(new Server('localhost', 27017));

mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("angular-music-db");
    db.collection('songs', {strict:true}, function(err, collection) {
        if (err) {
            console.log('Initialize DataBase...');
            createDB();
        }
    });
});

exports.getDB = function() {
	return db;
};

exports.resetDB = function(req, res) {
	db.dropDatabase(function() {
		createDB(function() {
			console.log('database reset done!');
			res.write('done!');
			res.end();
		});
	});
};

var createTableFromFile = function(tableName, filePath, cb) {
	fs.readFile(filePath, 'utf8', function(err, data) {
		if (err) throw err;
		data = JSON.parse(data);
		db.collection(tableName, function(err, collection) {
	        collection.insert(data, {data:true}, function(err, result) {
	        	if (err) throw err;
	        	console.log('Initialized "' + tableName + '" Table...');
	        	cb();
	        });
	    });
	});
};

var createDB = function(callback) {

	async.parallel([
		//初始化专辑
		function(cb) {
			createTableFromFile('albums', dataPath + '/albums.json', cb);
		},
		//初始化歌曲
		function(cb) {
			createTableFromFile('songs', dataPath + '/songs.json', cb);
		},
		//初始化歌手
		function(cb) {
			createTableFromFile('artists', dataPath + '/artists.json', cb);
		},
		//初始化收藏
		function(cb) {
			createTableFromFile('favorites', dataPath + '/favorites.json', cb);
		}
	], function(err, results) {
		if(err) throw err;
		callback && callback();
	});
};