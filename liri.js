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
moment().format();

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

// do what it says txt
function doWhatItSays () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        
        // split txt into two
        var dataArray = data.split(",");
        var option = (dataArray[0]);
        var parameter = (dataArray[1]);
        console.log(option, parameter);

        if (err) {
            console.log(error);
        } 
        else if (option == "movie-this") {
            movieEntered = parameter;
            omdbThis()
        }
        else if (option == "spotify-this-song") {
            songEntered = parameter;
            spotifyThis()
        }
        
    });
}
// test do what it says, works!
// doWhatItSays();

// switch commands for functions
var ask = function(commands, inputData) {
    switch (commands) {
        case "spotify-this-song":
            spotifyThis(inputData);
            break;
    
        case "movie-this":
            omdbThis(inputData);
            break;
    
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Please try again, invalid entry.");
    }
};



ask (action, entry);