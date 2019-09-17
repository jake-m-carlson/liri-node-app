// included in instructions, require dotenv to prevent passwords and keys from being displayed
require("dotenv").config();

// import keys.js
var keys = require("./keys.js");

// fs
var fa = require("fs");

// spotify 
var Spotify = require('node-spotify-api');

// access spoftify via keys.js
var spotify = new Spotify(keys.spotify);


 
 // copied from npmjs.com
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
