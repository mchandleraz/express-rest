var should 		= require('chai').should();
var expect 		= require('chai').expect;
var request 	= require('supertest');
var app 		= require('../app.js');
var baseUrl 	= app.get('baseUrl');

describe('ROUTING', function() {
	describe('/', function () {

		describe('PUT', function() {
			it('responds with 404', function (done) {
				request(app)
				.put(baseUrl)
				.set('Accept', 'application/json')
				.expect(404)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					done();

				});
			});
		})
	});

	describe('/users/', function () {

		describe('GET', function () {
			it('responds with 200', function(done) {
				request(app)
				.get(baseUrl + '/users')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					done();

				});
			});
		});

		describe('POST', function () {
			it('responds with 500 if username is missing', function (done) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({})
				.expect(500)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					done();
				});
			});
			it('responds with 500 if password is missing', function (done) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({})
				.expect(500)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					done();
				});
			});
			it('responds with 500 if username is less than 4 characters', function (done) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({
					'username': 'foo',
					'password': 'thisisalongpasswordright'
				})
				.expect(500)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					done();
				});
			});
			it('responds with 500 if password is less than 12 chars', function (done) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({
					'username': 'whoahnelly',
					'password': 'shorty'
				})
				.expect(500)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					done();
				});
			});
			it('responds with 200 for valid payload', function (done) {
				request(app)
				.post(baseUrl + '/users')
				.set('Accept', 'application/json')
				.send({
					'username': 'acceptable',
					'password': 'supercalifragilistic'
				})
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					done();
				})
			})
		});

	});

	describe('/users/:id', function () {
		describe('GET', function () {
			it('responds with 200', function (done) {
				request(app)
				.get(baseUrl + '/users/56f6fb023724d009116d08f6')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					done();

				});
			});
		});

		describe('PUT', function () {
			it('updates a user', function (done) {
				request(app)
				.put(baseUrl + '/users/56f6fb023724d009116d08f6')
				.set('Accept', 'application/json')
				.send({
					'username': 'acceptable',
					'password': 'supercalifragilistic'
				})
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					done();

				});
			});
		});
	});

	describe('/authenticate', function () {
		describe('POST', function () {
			it('returns a token for a valid user', function(done) {
				request(app)
				.post(baseUrl + '/authenticate')
				.set('Accept', 'application/json')
				.send({
					username: 'acceptable',
					password: 'supercalifragilistic'
				})
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}

					expect(res.body).to.have.property('token');

					done();
				});

				function validator(res) {
					return false
				}
			});
		});
	});
});