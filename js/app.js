// Application Setup
App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.BasicAdapter'
});

// Router and Routes
App.Router.map(function() {
  this.resource('movies', function() {
    this.route('movie', { path: ':title/:movie_id' });
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('movies');
  }
});

App.MoviesMovieRoute = Ember.Route.extend({
  serialize: function(movie) {
    return {
      movie_id: movie.id,
      title: movie.get('title').dasherize()
    }
  },

  setupController: function(controller, model) {
    // TODO: can 'response' be used as as cache attribute to reprent unnecessary HTTP requests?
    model.reload();
  }
});

// Controllers
App.MoviesController = Ember.ArrayController.extend({
  count: function() {
    var c = this.get('content.length');
    return c;
  }.property('content.length'),

  findMovie: function(movie) {
    this.set('content', App.Movie.find({s: movie}));
  }
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
      var q = {}, _munge = this.munge;
      q['i'] = id;
      $.getJSON(this.base_url, Ember.$.extend({}, q, this.findQueryOptions)).then(function(result) {
        process(result)
          .camelizeKeys()
          .munge(_munge)
          .load();
      });
    },
    query: function(query, process) {
      var _munge = this.munge;
      $.getJSON(this.base_url, Ember.$.extend({}, query)).then(function(result) {
        process(result.Search || [])
          .camelizeKeys()
          .munge(_munge)
          .load();
      });
    }
  }
  sync_copy = Ember.$.extend(true, {}, sync);
  return sync_copy;
}

// Models
var attr = DS.attr, get = Ember.get;
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
  imdbID: attr('string'),
  tomatoMeter: attr('number'),
  tomatoImage: attr('string'),
  tomatoRating: attr('number'),
  tomatoReviews: attr('number'),
  tomatoFresh: attr('number'),
  tomatoRotten: attr('number'),
  tomatoConsensus: attr('string'),
  tomatoUserMeter: attr('number'),
  tomatoUserRating: attr('number'),
  tomatoUserReviews: attr('number'),
  response: attr('boolean'),

  primaryKey: function() {
    return get('imdbID');
  }
});

App.Movie.sync = App.omdbApiSync('movie');
App.Movie.sync.findQueryOptions = { tomatoes: true, plot: 'full' }
App.Movie.sync.munge = function(json) {
  json.id = json.imdbID;
  json.imdbRating = parseFloat(json.imdbRating || 0);
  json.imdbVotes = parseInt((json.imdbVotes || '0').replace(/,/g, ''));
  json.tomatoMeter = parseInt(json.tomatoMeter || 0);
  json.tomatoRating = parseFloat(json.tomatoRating || 0);
  json.tomatoReviews = parseInt((json.tomatoReviews || '0').replace(/,/g, ''));
  json.tomatoFresh = parseInt((json.tomatoFresh || '0').replace(/,/g, ''));
  json.tomatoRotten = parseInt((json.tomatoRotten || '0').replace(/,/g, ''));
  json.tomatoUserMeter = parseInt(json.tomatoUserMeter || 0);
  json.tomatoUserRating = parseFloat(json.tomatoUserRating || 0);
  json.tomatoUserReviews = parseInt((json.tomatoUserReviews || '0').replace(/,/g, ''));
}
