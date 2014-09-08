import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    search: function(keywords) {
      if (keywords) {
        this.transitionTo('/search?q=' + keywords);
      }
    }
  }
});
