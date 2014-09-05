import Ember from 'ember';

export default Ember.Object.extend({
  findQuery: function(name, query) {
    var adapter = this.container.lookup('adapter:' + name);
    return adapter.findQuery(name, query);
  }
});
