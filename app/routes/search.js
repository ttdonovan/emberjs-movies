import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findQuery('movie', { s: params.q });
  },

  actions: {
    selectMovie: function(movie) {
      this.controller.set('selectedMovie', movie);
    }
  }
});
