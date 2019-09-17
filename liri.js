// basic requirements
require("dotenv").config();
var request = require("request");
var fs = require("fs");

// import keys.js
var keys = require("./keys.js");

// spotify 
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// moments 
var moment = require("moment");

// variables from command line
var action = process.argv[2];
var entry = process.argv[3];

// functions

// spotify
function spotifyThis(songEntered) {

    // if no song is entered, defaults to Ace of Base "The Sign" 
    if (songEntered === undefined || null) {
        songEntered = "The Sign";
    }
    // request to spotify
    spotify.search({ type: 'track', query: songEntered }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++) {
                var musicSearch = data.tracks.items[i];
                console.log("========================");
                // artist
                console.log("Artist: " + musicSearch.artists[0].name +
                    // song name
                    "\nSong Name: " + musicSearch.name +
                    // link to preview song
                    "\nLink to Song: " + musicSearch.preview_url +
                    // album that the song is from
                    "\nAlbum Name: " + musicSearch.album.name +
                    "\n========================");

            }
        };

    });
}
// test spotify function, works!
// spotifyThis();

// omdb
function omdbThis(movieEntered) {
    // if no movie is entered, defaults to "Mr. Nobody"
    if (movieEntered === undefined || null) {
        movieEntered = "Mr.Nobody";
        console.log("If you haven't watched 'Mr. Nobody', then you should: ")
        console.log("It's on Netflix!")
    }

    // request to omdb api with a movie
    var searchUrl = "http://www.omdbapi.com/?t=" + movieEntered + "&y=&plot=short&apikey=trilogy";

    console.log(searchUrl);

    request(searchUrl, function (error, response, body) {
        // if request is successful 
        if (!error && response.statusCode === 200) {
            //json parse
            var movieData = JSON.parse(body);

            console.log("========================");
            // title of movie
            console.log("Movie Title: " + movieData.Title +
            // year released
            "\nYear Released: " + movieData.Released +
            // IMDB rating
            "\nIMDB Rating: " + movieData.imdbRating +
            // Rotten Tomatoes rating
            "\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value +
            // countries movie was produced
            "\nCountry Produced: " + movieData.Country +
            // language 
            "\nLanguage: " + movieData.Language +
            // plot
            "\nPlot: " + movieData.Plot +
            // actors
            "\nActors: " + movieData.Actors +
            "\n========================");
            
        };
    });
}
// testing omdb function, works!
// omdbThis();

// switch commands for functions
switch (action) {
    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        omdbThis();
        break;
}
// var ask = function (commands, funData)