//auther stefan
var express = require('express'),
    path = require('path'),
    db = require('./routes/db'),
    album = require('./routes/album'),
    artist = require('./routes/artist'),
    user = require('./routes/user'),
    cms = require('./routes/cms'),
    music = require('./routes/music'),
    search = require('./routes/search'),
    lyric = require('./routes/lyric');

var app = express();
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, '../client/app')));

app.get('/data/lyric/:file', lyric.getLyric);

app.use('/data', express.static(path.join(__dirname, '/data')));

app.get('/album/:id', album.findById);
app.get('/album', album.findAll);

app.get('/music/:id', music.findById);
app.get('/music', music.findAll);

app.get('/artist/:id', artist.findById);
app.get('/artist', artist.findAll);

app.get('/search', search.search);

// app.get('/user/:id', user.findById);
// app.get('/user/:id/fav', user.findAllFav);
// app.get('/user/:id/fav/:fid', user.findFavById);
// app.post('/user/:id/fav', user.addFav);
// app.put('/user/:id/fav/:fid', user.updateFavById);

app.get('/cms/slider', cms.findSliders);
app.get('/cms/hot', cms.findHots);
app.get('/cms/new', cms.findNews);

//危险，请注意，访问此链接会导致数据库重置
app.get('/initDB', db.resetDB);

app.listen(1987);
console.log('Listening port 1987...');