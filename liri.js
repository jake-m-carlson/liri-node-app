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

function spotifyThis(songEntered) {

    // if no song is entered, defaults to Ace of Base "The Sign" 
    if (songEntered === undefined || null) {
        songEntered = "The Sign";
    }

    spotify.search({ type: 'track', query: songEntered }, function(err, data) {
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
spotifyThis();