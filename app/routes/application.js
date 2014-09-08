import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    search: function(q) {
      if (q) {
        this.transitionTo('/search?q=' + q);
      }
    }
  }
});
