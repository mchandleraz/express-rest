var should 		= require('chai').should();
var app 		= require('../../app.js');
var baseUrl 	= app.get('baseUrl');

describe('MODELS', function () {

  var User = require('../../models/user');

  describe('User', function() {

    it('throws an error if password.length < 12', function () {
      var user = {
        username: 'foo4',
        password: 'barbar'
      };

      User.create(user, function (err) {
        should.exist(err);
      });
    });

    it('throws an error if username.length < 4', function () {
      var user = {
        username: 'foo',
        password: 'barbarfoofooasdf'
      };

      User.create(user, function (err) {
        should.exist(err);
      });

    });

    it('throws an error if password is missing', function () {
      var user = {
        username: 'foo4',
        password: null
      };

      User.create(user, function (err) {
        should.exist(err);
      });
    });

    it('throws an error if username is missing', function () {
      var user = {
        username: null,
        password: 'barbarfoofooasdf'
      };

      User.create(user, function (err) {
        should.exist(err);
      });
    });

    it('persists a User if data is valid', function () {
      var validUser = {
        username: 'testUser' + Date.now(),
        password: 'passwordwoooo',
        admin: false
      };

      User.create(validUser, function (err) {
        should.not.exist(err);
      });
    });

    it('trims the username', function () {
      var validUser = {
        username: 'userfoo  ',
        password: 'passwordwoooo',
        admin: false
      };

      User.create(validUser, function (err, createdUser) {
        createdUser.username.should.equal('userfoo');
      });
    });

    it('trims the password', function () {
      var validUser = {
        username: 'userfoo',
        password: 'passwordwoooo   ',
        admin: false
      };

      User.create(validUser, function (err, createdUser) {
        createdUser.password.should.equal('passwordwoooo');
      });
    });
  });

  describe('Static Methods', function () {

    it('encryptPassword: encrypts the password', function () {

      var user = new User();
      var password = 'passwordwoooo';
      var encryptedPassword = user.encryptPassword(password);

      encryptedPassword.should.not.equal(password);
    });

    it('decryptPassword: decrypts the password', function () {

      var user = new User();
      var password = 'passwordwoooo';
      var encryptedPassword = user.encryptPassword(password);
      var decryptedPassword = user.decryptPassword(password, encryptedPassword);

      decryptedPassword.should.be.true;
    });
  });
});