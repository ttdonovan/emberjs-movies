import Ember from 'ember';

var Router = Ember.Router.extend({
  location: MoviesENV.locationType
});

Router.map(function() {
  this.resource('movies');
  this.resource('movie', { path: 'movies/:title/:movie_id' });

  this.route('search');
  this.route('not-found', { path: '/*wildcard' });
});

export default Router;
