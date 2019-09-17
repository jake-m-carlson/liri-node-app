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
var one = process.argv[2];
var two = process.argv[3];

// access spoftify via keys.js


 
 // copied from npmjs.com
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
