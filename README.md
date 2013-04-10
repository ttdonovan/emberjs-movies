# Movies app built with Ember.js and Ember Data

An example application built with [Ember.js](http://emberjs.com/) and [Ember Data](http://emberjs.com/guides/models/)
using the [Basic Adapter](http://emberjs.com/blog/2013/03/22/stabilizing-ember-data.html)
and the [The Open Movie Database API](http://www.omdbapi.com/).

## Usage

    $ bin/server
    $ open http://localhost:3000

## References

* Many thanks to [Ember Data and the Meetup API](http://blog.mrloop.com/blog/2013/04/07/ember-data-and-the-meetup-api/) for the **Sync Object**

## FIXMEs
* Why in the Sync Object, find(id, process) is process 'undefined'
    * m = App.Movie.find('tt0076759'); // star wars
    * Uncaught TypeError: undefined is not a function app.js:71

## TODOs

* cleanup index.html handlebars templates and make the app look pretty
* review the app.js routes, uncertain if 'search' and 'movies/movie' nested resources are correct
* added an example of best practices with modal windows
* add an example of best practices with pagination
