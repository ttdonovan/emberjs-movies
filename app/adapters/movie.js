import Ember from 'ember';

export default Ember.Object.extend({

  findQuery: function(name, query) {
    return Ember.$.getJSON('http://www.omdbapi.com/?s=' + query['s'])
      .then(function(result) {
        if (result.hasOwnProperty('Search')) {
          return result.Search.map(function(c) {
            return {
              id: c.imdbID,
              title: c.Title,
              year: c.Year,
              type: c.Type
            };
        });
        } else {
          return [];
        }
      });
  }

});
