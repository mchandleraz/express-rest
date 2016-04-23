var should 		= require('chai').should();
var app 		= require('../../app.js');
var baseUrl 	= app.get('baseUrl');

describe('MODELS', function () {

  var User = require('../../models/user');

  describe('User', function() {

    it('throws an error if password.length < 12', function (done) {
      var user = {
        username: 'foo4',
        password: 'barbar'
      };

      User.create(user, function (err) {

        should.exist(err);

        done();
      });
    });

    it('throws an error if username.length < 4', function (done) {
      var user = {
        username: 'foo',
        password: 'barbarfoofooasdf'
      };

      User.create(user, function (err) {

        should.exist(err);

        done();
      });
    });

    it('throws an error if password is missing', function (done) {
      var user = {
        username: 'foo4',
        password: null
      };

      User.create(user, function (err) {

        should.exist(err);

        done();
      });
    });

    it('throws an error if username is missing', function (done) {
      var user = {
        username: null,
        password: 'barbarfoofooasdf'
      };

      User.create(user, function (err) {

        should.exist(err);

        done();
      });
    });

    it('persists a User if data is valid', function (done) {
      var validUser = {
        username: 'testUser' + Date.now(),
        password: 'passwordwoooo',
        admin: false
      };

      User.create(validUser, function (err, createdUser) {

        should.not.exist(err);

        done();
      });
    });

    it('trims the username', function (done) {
      var validUser = {
        username: 'userfoo  ',
        password: 'passwordwoooo',
        admin: false
      };

      User.create(validUser, function (err, createdUser) {

        createdUser.username.should.equal('userfoo');

        done();
      });
    });

    it('trims the password', function (done) {
      var validUser = {
        username: 'userfoo',
        password: 'passwordwoooo   ',
        admin: false
      };

      User.create(validUser, function (err, createdUser) {

        createdUser.password.should.equal('passwordwoooo');

        done();
      });
    });
  });
});