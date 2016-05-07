var User 		= require('../../models/user');
var jwt 		= require('jsonwebtoken');
var isAuthenticated = require('./../util').isAuthenticated

var routes = function(app) {

	var baseUrl = app.get('baseUrl') + '/users';

	/* GET users listing. */
	app.get(baseUrl + '/', function (req, res, next) {

		User.find(function (err, users) {
			if (err) {
				return next(err);
			}

			res.json(users);
		});
	});
	
	/* GET specific user*/
	app.get(baseUrl + '/:id', function (req, res, next) {

		User.findById(req.params.id, function (err, user) {
			if (err) {
				return next(err);
			}

			res.json(user);
		});
	});
	
	/* POST new user */
	app.post(baseUrl + '/', function (req, res, next) {	

		var user 		= new User();
		
		user.password	= user.encryptPassword(req.body.password);
		user.username	= req.body.username;
		user.admin		= false;

		User.create(user, function (err, createdUser) {
			var token;
			
			if (err) {
				return next(err);
			}

			// TODO: make env var?
			token = jwt.sign(user, req.app.get('jwtSecret'), {
				expiresIn: 86400
			});

			res.status(200).send({
				message: 'success',
				username: createdUser.username,
				token: token,
				success: true
			});

		});

	});

	/* Update existing user */
	app.put(baseUrl + '/:id', isAuthenticated, function (req, res, next) {

		User.findById(req.params.id, function (err, user) {
			if (err) {
				return res.send(err);
			} else {
				user.password 	= user.encryptPassword(req.body.password);
				user.username 	= req.body.username;
				user.admin		= false;

				user.save(function (err) {
					if (err) {
						return next(err);
					}

					res.send(user);
				});
			}

		});
	});
};

module.exports = routes;
