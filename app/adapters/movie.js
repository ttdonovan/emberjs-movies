import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Object.extend({

  findQuery: function(name, query) {
    return Ember.$.getJSON('http://www.omdbapi.com/?s=' + query['s'])
      .then(function(result) {
        return result.Search.map(function(c) {
          return {
            id: c.imdbID,
            title: c.Title,
            year: c.Year,
            type: c.Type
          }
        });
      });
  }

});
