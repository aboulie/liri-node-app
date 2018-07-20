# LIRI-Bot
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### What Each Command Does

1. `node liri.js my-tweets`

   * This shows my last 20 tweets and when they were created at on the terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song on the terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information on the terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
     * It's on Netflix!
   
4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It runs `spotify-this-song` for "I Want it That Way," since that's the value in `random.txt`.
     
### BONUS

* In addition to logging the data on the terminal/bash window, the date is also output to a .txt file called `log.txt`.

* Each command run is appended to the `log.txt` file. 

## End Summary of Packages Used:
        var fs = require("fs"); //reads and writes files
	    var request = require("request");
	    var keys = require("./keys.js");
	    var twitter = require("twitter");
	    var Spotify = require('node-spotify-api');
## Author
This app was built by Dareen Mohamad.

## Link to Author's Portfolio
https://aboulie.github.io/Bootstrap-Portfolio/

## Link to App in Github
https://aboulie.github.io/liri-app-node/