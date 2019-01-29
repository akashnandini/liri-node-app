require("dotenv").config();

// variables
var axios = require("axios");
//var inquirer = require("inquirer");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

var nodeArgs = process.argv;
var option = nodeArgs[2];
var inputs = nodeArgs[3];
//console.log(option)
//console.log(inputs)
switch (option) {
    case "concert-this":
	concert(inputs);
    break;
    
	case "spotify-this-song":
	song_spotify(inputs);
	break;

	case "movie-this":
	movie(inputs);
	break;

	case "do-what-it-says":
	doWhatItSays();
    break;
    
    case "default":
    console.log("Please enter valid option")
};

function song_spotify(inputs){
    //console.log("nandini")
    if (!inputs) {
        inputs = "The Sign";
    }
    //console.log(inputs)
    spotify.search({
    type: "track",
    query: "\"" + inputs + "\""
    }, function (error, data) {
    //console.log(data);
    //console.log(JSON.stringify(data))
    if (!error) {
        var songInfo = data.tracks.items;
        //console.log(songInfo)
        for (var i = 1; i <2 ; i++) {
            if (songInfo[i] != undefined) {
               // console.log(songInfo[i])
                var spotifyResults =
                    "------------------------------" + "\r\n" +
                    "ARTIST NAME: " + songInfo[i].artists[0].name + "\r\n" +
                    "SONG NAME: " + songInfo[i].name + "\r\n" +
                    "PREVIEW LINK: " + songInfo[i].preview_url + "\r\n" +
                    "ALBUM NAME: " + songInfo[i].album.name + "\r\n" +
                    "------------------------------" + "\r\n";
                console.log(spotifyResults);
                logFile(spotifyResults);
            }
        }
    } else {
        console.log("Error :" + error);
        return;
    }
});
}

function movie(inputs){
    if (!inputs) {
        inputs = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";    
    axios.get(queryUrl).then(
    function(response,error) {
      //console.log(response);
      if(!error){
       var movieResults =
                "------------------------------" + "\r\n" +
                "MOVIE TITLE: " + response.data.Title +"\r\n" +
                "YEAR OF RELEASE: " + response.data.Year +"\r\n" +
                "IMDB RATING: " + response.data.imdbRating +"\r\n" +
                "ROTTEN TOMATOES RATING: " + response.data.Ratings[0].Value +"\r\n" +
                "COUNTRY: " + response.data.Country +"\r\n" +
                "LANGUAGE: " + response.data.Language +"\r\n" +
                "PLOT: " + response.data.Plot +"\r\n" +
                "ACTORS: " + response.data.Actors +"\r\n" +
                "---------------------------"+"\r\n";
        console.log(movieResults);
        logFile(movieResults);
      }
      else{
        console.log("Error :" + error);
        return;
      }
    });
}

function concert(inputs){
    queryUrl = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
    function (response,error) {
        //console.log(JSON.stringify(response));
        //console.log(response)
        if (!error) {
        for (var i = 0; i < response.data.length; i++) {
            var concertResults =
            "------------------------------" + "\r\n" +
            "NAME OF THE VENUE: " + response.data[i].venue.name +"\r\n" +
            "VENUE LOCATION: " +  response.data[i].venue.city +"\r\n" +
            "DATE OF THE EVENT: " +moment(response.data[i].datetime).format("MM/DD/YYYY") +"\r\n" +
            "---------------------------"+"\r\n";
            console.log(concertResults);
            logFile(concertResults);
          }   
        }
        else{
            console.log("Error :" + error);
            return;
        }
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);
        //console.log(data.toString());
        var random = data.toString().split(',');
        if(random[0] === "spotify-this-song"){
            var song = random[1];
            //console.log("song==="+song)
            song_spotify(song);
        }
    });
}

// outputs all data to log.txt
function logFile(data) {
    fs.appendFile("log.txt", data, function(err) {
        if (err) {
            console.log(err);
        }        
    });
}