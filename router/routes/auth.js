var User 				= require('../../models/user');
var jwt 				= require('jsonwebtoken');
var isAuthenticated 	= require('./../util').isAuthenticated

var routes = function(app) {

	var baseUrl = app.get('baseUrl') + '/auth';

	/* GET users listing. */
	app.get(baseUrl + '/', function (req, res, next) {

		User.find(function (err, users) {
			if (err) {
				return next(err);
			}

			res.json(users);
		});
	});
	
	/* POST */
	app.post(baseUrl + '/', function (req, res, next) {
		User.findOne({
			name: req.body.name
		}, function(err, user) {

			if (err) {
				return next(err);
			}

			if (!user) {
				return res.json({success: false, message: 'Authentication failed. User not found.'});
			}

			// check if password matches
			if (user.password != req.body.password) {
				return res.json({success: false, message: 'Authentication failed. Wrong password.'});
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			} 

			});
	});
};

module.exports = routes;
