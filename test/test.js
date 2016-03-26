var should 		= require('chai').should();
var expect 		= require('chai').expect;
var request 	= require('supertest');
var app 		= require('../app.js');
var config 		= require('../config');

describe('/', function () {
	describe('GET', function() {
		it('responds with 501', function (done) {
			request(app)
			.get('/api/1/')
			.set('Accept', 'application/json')
			.expect(501)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}

				done();

			});
		});
	});
});

describe('/users/', function() {

	describe('GET', function() {
		it('responds with 501', function(done) {
			request(app)
			.get('/api/1/users')
			.set('Accept', 'application/json')
			.expect(501)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}

				done();

			});
		});
	});
});