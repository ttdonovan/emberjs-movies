// Application Setup
App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.BasicAdapter'
});

// Router and Routes
App.Router.map(function() {
  this.resource('search');
  this.resource('movies', function() {
    this.resource('movie', { path: ':movie_id' })
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('search');
  }
});

// Controllers
App.SearchController = Ember.Controller.extend({
  needs: ['movies'],

  findMovie: function(movie) {
    console.log(movie);
  }
});

App.MoviesController = Ember.ArrayController.extend({
  
});

// Views
App.SearchMovieView = Ember.View.extend({
  templateName: 'search_movies',
  tagName: 'form',
  classNames: ['form-search'],

  queryString: '',

  submit: function() {
    this.get('controller').send('findMovie', this.get('queryString'));
    this.set('queryString', '');
    return false;
  }
});

// Sync Object
App.omdbApiSync = function(type) {
  sync = {
    type: type,
    primaryKey: 'id',
    munge: function(json) { json },
    findQueryOptions: {},
    base_url: 'http://www.omdbapi.com/',
    find: function(id, process) {
      var q = {}, _munge = this.munge, _primaryKey = this.primaryKey, _type = this.type;
      q['i'] = id;
      // debugger; // why is process 'undefined'
      $.getJSON(this.base_url, Ember.$.extend({}, q, this.findQueryOptions)).then(function(result) {
        process(result)
          .primaryKey(_primaryKey)
          .camelizeKeys()
          .applyTransforms(_type)
          .munge(_munge)
          .load();
      });
    }
  }
  sync_copy = Ember.$.extend(true, {}, sync);
  return sync_copy;
}

// Models
var attr = DS.attr;

App.Movie = DS.Model.extend({
  title: attr('string'),
  year: attr('string'),
  rated: attr('string'),
  released: attr('string'),
  runtime: attr('string'),
  genre: attr('string'),
  director: attr('string'),
  writer: attr('string'),
  actors: attr('string'),
  plot: attr('string'),
  poster: attr('string'),
  imdbRating: attr('number'),
  imdbVotes: attr('number'),
  imdbID: attr('string')
});

App.Movie.sync = App.omdbApiSync('movie');
App.Movie.sync.primaryKey = 'imdbID';
App.Movie.sync.findQueryOptions = { tomatoes: true, plot: 'full' }
