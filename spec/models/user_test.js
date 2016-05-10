var app 		  = require('../../app.js');
var User      = require('../../models/user');

var baseUrl   = app.get('baseUrl');

describe('User Model', function() {
  it('throws an error if password.length < 12', function (done) {
    var user = {
      username: 'foo4',
      password: 'barbar'
    };

    User.create(user, function (err) {
      expect(err).toBeDefined();
      expect(err).not.toBeNull();
      done();
    });
  });

  it('throws an error if username.length < 4', function (done) {
    var user = {
      username: 'foo',
      password: 'barbarfoofooasdf',
      admin: true
    };

    User.create(user, function (err) {
      expect(err).not.toBeNull();
      done();
    });
  });

  it('throws an error if password is missing', function (done) {
    var user = {
      username: 'foo4',
      password: null
    };

    User.create(user, function (err) {
      expect(err).toBeDefined();
      expect(err).not.toBeNull();
      done();
    });
  });

  it('throws an error if username is missing', function (done) {
    var user = {
      username: null,
      password: 'barbarfoofooasdf'
    };

    User.create(user, function (err) {
      expect(err).toBeDefined();
      expect(err).not.toBeNull();
      done();
    });
  });

  it('persists a User if data is valid', function (done) {
    var validUser = {
      username: 'testUser' + Date.now(),
      password: 'passwordwoooo',
      admin: false
    };

    User.create(validUser, function (err) {
      expect(err).toBeNull();
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
      expect(createdUser.username).toEqual('userfoo');
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
      expect(createdUser.password).toEqual('passwordwoooo');
      done();
    });
  });
  
  describe('Static Methods', function () {

    it('encryptPassword: encrypts the password', function () {

      var user = new User();
      var password = 'passwordwoooo';
      var encryptedPassword = user.encryptPassword(password);

      expect(encryptedPassword).not.toEqual(password);
    });

    it('decryptPassword: decrypts the password', function () {

      var user = new User();
      var password = 'passwordwoooo';
      var encryptedPassword = user.encryptPassword(password);
      var decryptedPassword = user.decryptPassword(password, encryptedPassword);

      expect(decryptedPassword).toBe(true);
    });
  });
});
