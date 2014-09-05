import Ember from 'ember';

var Router = Ember.Router.extend({
  location: MoviesENV.locationType
});

Router.map(function() {
  this.resource('movies');

  this.route('not-found', { path: '/*wildcard' });
});

export default Router;
