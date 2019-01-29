# liri-node-app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

####Liri.js can take in one of the following commands:

  concert-this '<artist/band name here>'

  node liri.js spotify-this-song '<song name here>'

  node liri.js movie-this '<movie name here>'

  node liri.js do-what-it-says
  
#####node liri.js concert-this _artist/band name here

This will search the Bands in Town Artist Events API for an artist and render 'Name of the venue','Venue location' and 'Date of the Event' about each event 

liri.js concert-this skrillex

![Screenshot](screenShot/concert.PNG)


  

####These commands will log data into a log.txt file.

  concert

  spotify-this-song

  movie-this
