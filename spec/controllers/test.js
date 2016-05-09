var request 	= require('supertest');
var mongoose 	= require('mongoose');
var mockgoose	= require('mockgoose');

mockgoose(mongoose);

var app 		= require('../../app.js');
var baseUrl 	= app.get('baseUrl');

describe('CONTROLLERS', function() {

	var token;

	describe('/users/', function () {

		describe('GET', function () {
			it('responds with 200', function(done) {
				request(app)
				.get(baseUrl + '/users')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err) {
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
				.send({
					'username': null,
					'password': 'thisisalongpasswordright'
				})
				.expect(500)
				.end(function (err) {
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
				.send({
					'username': 'testUserWithMockgoose',
					'password': null
				})
				.expect(500)
				.end(function (err) {
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
				.end(function (err) {
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
				.end(function (err) {
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
					'username': 'testUserWithMockgoose',
					'password': 'testPasswordThatsLongEnough'
				})
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					token = res.body.token;
					done();
				})
			});
		});
	});

	describe('/users/:id', function () {
		describe('GET', function () {
			it('responds with 200', function (done) {
				request(app)
				.get(baseUrl + '/users/56f6fb023724d009116d08f6')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err) {
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
					'password': 'supercalifragilistic',
					'token': token
				})
				.expect(200)
				.end(function (err) {
					if (err) {
						return done(err);
					}
					done();
				});
			});
		});
	});
});