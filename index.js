var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

let Song = require('./models/Song')


var mongodb = "mongodb://admin:admin123@ds249249.mlab.com:49249/segudb1";


// Connect to Sandbox MongoDB


mongoose.connect(mongodb,{useNewUrlParser: true});


/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */


// post a song via html Form, working

app.get('/addSong', function(req, res) {
    res.render('addSong', {})
})


// posts song , working now!
app.post('/api/addSong', function(req,res) {
  console.log((req.body));
  if(!req.body) {
      return res.send('request body is missing');
  } else {
    let model = new Song({
      name: req.body.name,
      artists: req.body.artists,
      year: req.body.year,
      rating: req.body.rating,
      genre: req.body.genre
    });
    model.save(function(err){
      if(err) throw err;
      res.send('your song was successfully added!');
    })
  }
});



// At the home / route, you should display every data point in an HTML Page.
// working!!
app.get("/", function (req, res) {
    Song.find({}, function (err, songs) {
        if (err) throw err;
        res.render("allSongs", {
            songs: songs
        });
    });
});


// Return all data points as JSON
// working!!
app.get('/api/getSongs', function (req, res) {
    Song.find({}, function (err, songs) {
        if (err) throw err;
        res.json(songs);
    });
});



app.get('/api/getSongsByYear', function (req, res) {

  year = req.query.year;
  if(!year) {
    res.send("missing year");
  }

    Song.find({year:year}, function (err, songs) {
        if (err) throw err;
        res.json(songs);
    });
});


app.get('/api/getSongsByRating', function (req, res) {

  rating = req.query.rating;
  if(!rating) {
    res.send("missing rating");
  }

    Song.find({rating:rating}, function (err, songs) {
        if (err) throw err;
        res.json(songs);
    });
});


app.get('/api/getSongsByGenre', function (req, res) {

  genre = req.query.genre;
  if(!genre) {
    res.send("missing rating");
  }

    Song.find({genre:genre}, function (err, songs) {
        if (err) throw err;
        res.json(songs);
    });
});


// display all songs with of the current year working!!
app.get("/songs/R&BSongs",function(req,res) {
  Song.find({genre: "R&B"},function(err,songs){
    if(err) throw err;
    res.render('show',{
        songs:songs
    });
  });
});



// display all songs with of the current year working!!
app.get("/songs/HipHopSongs",function(req,res) {
  Song.find({genre: "Hip Hop"},function(err,songs){
    if(err) throw err;
    res.render('show',{
        songs:songs
    });
  });
});

// display all songs with of the current year working!!
app.get("/songs/thisYear",function(req,res) {
  const date = new Date();
  const curYear = date.getFullYear();
  Song.find({year: curYear},function(err,songs){
    if(err) throw err;
    res.render('show',{
        thisYear: true,
        songs:songs
    });
  });
});
// displays songs that are before 1990 working!!
app.get("/songs/oldSongs",function(req,res) {
  const date = 1990;
  Song.find({year: {$lt : date}},function(err,songs){
    if(err) throw err;
    res.render('show',{
        oldSongs: true,
        songs:songs
    })
  })
});


//display songs with rating above 5, working!!
app.get('/songs/topSongs', function (req, res) {
    Song.find({rating: {$gt : 5}}, function (err, songs) {
        if (err) throw err;
          res.render("show", {
              h1: "Top Rated Songs",
              songs: songs,
          });
    });
});



//DELETE a song

app.delete('/removeSong', (req, res) => {
    if(!req.query.name) {
        return res.status(400).send('Missing query parameter: song name')
    }

    Song.findOneAndRemove({
        name: req.query.name
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})



// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '/public/500.html'))
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
