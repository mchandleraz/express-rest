var should 		= require('chai').should();
var expect 		= require('chai').expect;
var request 	= require('supertest');
var app 		= require('../app.js');
var baseUrl 	= app.get('baseUrl');

describe('ROUTING', function() {
	describe('/', function () {

		describe('GET', function() {
			it('responds with 501', function (next) {
				request(app)
				.get(baseUrl)
				.set('Accept', 'application/json')
				.expect(501)
				.end(function (err, res) {
					if (err) {
						return next(err);
					}

					next();

				});
			});
		});
	});

	describe('/users/', function() {

		describe('GET', function() {
			it('responds with 501', function(next) {
				request(app)
				.get(baseUrl + '/users')
				.set('Accept', 'application/json')
				.expect(501)
				.end(function (err, res) {
					if (err) {
						return next(err);
					}

					next();

				});
			});
		});

		describe('POST', function() {
			it('responds with 400 if username is missing', function(next) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({})
				.expect(400)
				.end(function(err, res) {
					if (err) {
						return next(err);
					}

					next();
				});
			});
			it('responds with 400 if password is missing', function(next) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({})
				.expect(400)
				.end(function(err, res) {
					if (err) {
						return next(err);
					}

					next();
				});
			});
			it('responds with 400 if username is less than 4 characters', function(next) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({
					'username': 'foo',
					'password': 'thisisalongpasswordright'
				})
				.expect(400)
				.end(function(err, res) {
					if (err) {
						return next(err);
					}

					next();
				});
			});
			it('responds with 400 if password is less than 12 chars', function(next) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({
					'username': 'whoahnelly',
					'password': 'shorty'
				})
				.expect(400)
				.end(function(err, res) {
					if (err) {
						return next(err);
					}

					next();
				});
			});
			it('responds with 200 for valid payload', function(next) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({
					'username': 'acceptable',
					'password': 'supercalifragilistic'
				})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return next(err);
					}

					next();
				})
			})
		});
	});
});

describe('MODELS', function() {

	var User = require('../models/user');

	describe('User', function() {

		it('throws an error if password.length < 12', function (next) {
			var user = {
				username: 'foo4',
				password: 'barbar'
			};

			User.create(user, function(err, createdUser) {
				// if (err) {
				// 	return next(err);
				// }
				should.exist(err);

				next();
			});
		});
		it('throws an error if username.length < 4', function (next) {
			var user = {
				username: 'foo',
				password: 'barbarfoofooasdf'
			};

			User.create(user, function(err, createdUser) {
				// if (err) {
				// 	return next(err);
				// }
				should.exist(err);

				next();
			});
		});
		it('throws an error if password is missing', function (next) {
			var user = {
				username: 'foo4'
			};

			User.create(user, function(err, createdUser) {
				// if (err) {
				// 	return next(err);
				// }
				should.exist(err);

				next();
			});
		});
		it('throws an error if username is missing', function (next) {
			var user = {
				password: 'barbarfoofooasdf'
			};

			User.create(user, function(err, createdUser) {
				// if (err) {
				// 	return next(err);
				// }
				should.exist(err);

				next();
			});
		});

		it('persists a User if data is valid', function (next) {
			var validUser = {
				username: 'testUser' + Date.now(),
				password: 'passwordwoooo'
			};

			User.create(validUser, function(err, createdUser) {
				if (err) {
					return next(err);
				}

				should.not.exist(err);

				next();
			});
		});

	});
});