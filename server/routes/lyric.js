//author stefan
var fs = require('fs'),
	path = require('path');

var lyricPath = path.join(__dirname, '../data/lyric');

exports.getLyric = function(req, res) {

	var file = req.params.file;
	fs.readFile(lyricPath + '/' + file, 'utf8', function(err, data) {
		if (err) throw err;

		var lines = data.split('\n'),
			jsonRegex = /\[(.*?)\](.*)$/,
			ret = [], matchResult;

		lines.forEach(function(line) {
			matchResult = line.match(jsonRegex); 
			matchResult && 
				matchResult[1] && 
				matchResult[2] && 
				ret.push({
					time: parseTime(matchResult[1]),
					content: matchResult[2]
				});
		});

		res.json(ret);
	});
};

function parseTime(lrcTime) {
	var ret = lrcTime.split(':');
	return parseInt(ret[0]) * 60 + parseFloat(ret[1]) + '';
}