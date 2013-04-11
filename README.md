# Movies app built with Ember.js and Ember Data

An example application built with [Ember.js](http://emberjs.com/) and [Ember Data](http://emberjs.com/guides/models/)
using the [Basic Adapter](http://emberjs.com/blog/2013/03/22/stabilizing-ember-data.html)
and the [The Open Movie Database API](http://www.omdbapi.com/).

## Usage

    $ bin/server
    $ open http://localhost:3000

## References

* Many thanks to [Ember Data and the Meetup API](http://blog.mrloop.com/blog/2013/04/07/ember-data-and-the-meetup-api/) for the **Sync Object**
* Simple example of **Master/Detail Views** [Master/Detail Views with Ember.js](http://broadcastingadam.com/2013/03/master-detail-views-with-ember/)

## Debugging

* App.Router.router.recognizer.names

## TODOs

* added an example of best practices with modal windows
* add an example of best practices with pagination
* add an example of spinner for $.ajax requests
* is it possible to cache App.Movie using the 'response' property
* make app fail gracefully if sending a bad URL i.e. /#/movies/foo/bar
