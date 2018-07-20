require("dotenv").config();

var keys = require("./keys.js");

var request = require("request");

var inquirer = require("inquirer");

var http = require("http");

var fs = require('fs');

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var trackName = "";
var movieName = "";
var randomTitleFromUser = "";

var getTweets = function() {

var params = {
screen_name: "dreenmhmd",
count: 20
};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error && response.statusCode === 200) {
           for (var singleTweet of tweets) {
             var tweetsToFile = "\n" + singleTweet.text + "\nPosted" + singleTweet.created_at + " ===";
             fs.appendFile("log.txt", tweetsToFile);
             console.log("Tweet" + tweetsToFile);
             }        
        } else {
      console.log(error);
    }
    });
};


var getTrackFromUser = function() {
   if (!process.argv[3]) {
     noTrackProvided();
   } else 
     trackProvided();
};


var noTrackProvided = function() {
     trackName = "The Sign Ace of Base";
     searchSpotify();
};


var trackProvided = function() {
    for (var i = 3; i < process.argv.length; i++){
    trackName += "+" + process.argv[i];
    }
  searchSpotify();
};


var searchSpotify = function() {
spotify.search({ type: 'track', query: trackName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    var spotifyToFile = "\n==============TRACK INFO==============\n"
    + "Track name: " + data.tracks.items[0].name + "\n"
    + "Artist: " + data.tracks.items[0].artists[0].name + "\n"
    + "Album Name: " + data.tracks.items[0].album.name + "\n"
    + "Listen to a preview: " + data.tracks.items[0].preview_url + "\n";
    fs.appendFile("log.txt", spotifyToFile);
    console.log(spotifyToFile);
    return;
}); 
};


var getMovieFromUser = function() {
  if (!process.argv[3]) {
     noMovieProvided();
   } else 
     movieProvided();
};


var noMovieProvided = function() {
     movieName = "Mr. Nobody";
     searchOMDB();
};


var movieProvided = function() {
    for (var i = 3; i < process.argv.length; i++){
    movieName += " " + process.argv[i];
    }
  searchOMDB();
};

var searchOMDB = function() {
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    var movieInfo = JSON.parse(body);
    var omdbToFile = "\n==============MOVIE INFO==============\n"
    + "Title: " + movieInfo.Title + "\n"
    + "Year: " + movieInfo.Year + "\n"
    + "IMDB Rating: " + movieInfo.imdbRating + "\n"
    + "Rotten Tomatoes Rating: " + movieInfo.tomatoRating + "\n"
    + "Country: " + movieInfo.Country + "\n"
    + "Language: " + movieInfo.Language + "\n"
    + "Plot: " + movieInfo.Plot + "\n"
    + "Actors: " + movieInfo.Actors + "\n";
    fs.appendFile("log.txt", omdbToFile);
    console.log(omdbToFile);
    }
});
} 

var doSomethingFromTxtFile = function() {
fs.readFile("./random.txt", "utf8", function(error, data) {


  if (error) {
    return console.log(error);
  }


  var randomFromFile = data.split(",");


  trackName = randomFromFile[1];

  searchSpotify();

});
};


switch (command) {
  case "my-tweets":
    fs.appendFile("log.txt", "\nCommand = my-tweets\n");
    getTweets();
    break;
  case "spotify-this-song":
    fs.appendFile("log.txt", "\nCommand = spotify-this-song\n");
    getTrackFromUser();
    break;
  case "movie-this":
    fs.appendFile("log.txt", "\nCommand = movie-this\n");
    getMovieFromUser();
    break;
  case "do-what-it-says":
    fs.appendFile("log.txt", "\nCommand = do-what-it-says\n");
    doSomethingFromTxtFile();
    break;
  default:
    var err = "That command is not an option.\nTry: \n'my-tweets'\n'spotify-this-song'\n'movie-this'\n'do-what-it-says'";
    fs.appendFile("log.txt", err);
    console.log(err);
}