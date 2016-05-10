var app 		  = require('../../app.js');
var Item      = require('../../models/item');

var baseUrl   = app.get('baseUrl');

describe('Item Model', function() {

  it('requires a "name"', function(done) {
    Item.create({}, function (err, createdUser) {
      expect(err).toBeDefined();
      expect(err).not.toBeNull();
      done();
    });
  });

  it('persists an Item', function(done) {
    Item.create({
      name: 'testItem'
    }, function (err, createdUser) {
      expect(err).toBeNull();
      done();
    });
  });
});
