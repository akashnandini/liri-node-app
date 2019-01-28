require("dotenv").config();

// variables
var axios = require("axios");
var inquirer = require("inquirer");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
//var request = require('request');
var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

var nodeArgs = process.argv;
var option = nodeArgs[2];
var inputs = nodeArgs[3];
console.log(option)
console.log(inputs)
switch (option) {
    case "concert":
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
};

function song_spotify(inputs){
    console.log("nandini")
    spotify.search({
    type: "track",
    query: "\"" + inputs + "\""
}, function (error, data) {
    //console.log(data);
    //console.log(JSON.stringify(data))
    if (!error) {
        var songInfo = data.tracks.items;
        for (var i = 0; i < 5; i++) {
            if (songInfo[i] != undefined) {
                var spotifyResults =
                    "------------------------------" + "\r\n" +
                    "ARTIST NAME: " + songInfo[i].artists[0].name + "\r\n" +
                    "SONG NAME: " + songInfo[i].name + "\r\n" +
                    "PREVIEW LINK: " + songInfo[i].preview_url + "\r\n" +
                    "ALBUM NAME: " + songInfo[i].album.name + "\r\n" +
                    "------------------------------" + "\r\n";
                console.log(spotifyResults);
                addToLog(spotifyResults);
            }
        }
    } else {
        console.log("Error :" + error);
        return;
    }
});
}

function movie(inputs){
    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl);
    axios.get(queryUrl).then(
    function(response) {
       // console.log(response);

       var movieResults =
                "------------------------------" + "\r\n" +
                "MOVIE TITLE: " + response.data.Title +"\r\n" +
                "YEAR OF RELEASE: " + response.data.Year +"\r\n" +
                "IMDB RATING: " + response.data.imdbRating +"\r\n" +
                "ROTTEN TOMATOES RATING: " + response.data.tomatoRating +"\r\n" +
                "COUNTRY: " + response.data.Country +"\r\n" +
                "LANGUAGE: " + response.data.Language +"\r\n" +
                "PLOT: " + response.data.Plot +"\r\n" +
                "ACTORS: " + response.data.Actors +"\r\n" +
                "---------------------------"+"\r\n";
        console.log(movieResults);
        addToLog(movieResults);

    }
    );
}

function concert(inputs){
    queryUrl = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
    function (response) {
        //console.log(JSON.stringify(response));
        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
            var concertResults =
            "------------------------------" + "\r\n" +
            "Date: " + response.data[i].datetime +"\r\n" +
            "Artist_Id: " + response.data[i].artist_id +"\r\n" +
            "Url: " + response.data[i].url +"\r\n" +
            "---------------------------"+"\r\n";
            console.log(concertResults);
            addToLog(concertResults);
          }      

    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);
        console.log(data.toString());
        //split text with comma delimiter
        var random = data.toString().split(',');
        if(random[0] === "spotify-this-song"){
            var song = random[1];
            console.log("song==="+song)
            song_spotify(song);
        }
        if(random[0] === "movie-this"){
            var movie = random[1];
            movie(movie);
        }
        if(random[0] === "concert"){
            var artist = random[1];
            concert(artist);
        }
    });
}

// outputs all data to log.txt
function addToLog(data) {
    fs.appendFile("log.txt", data, error => {
        if (error) {
            throw error;
        }
    });
}