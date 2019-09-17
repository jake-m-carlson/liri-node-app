// included in instructions, require dotenv to prevent passwords and keys from being displayed
require("dotenv").config();

// import keys.js
var keys = require("./keys.js");

// fs
var fa = require("fs");

// access spoftify via keys.js
var spotify = new Spotify(keys.spotify);

