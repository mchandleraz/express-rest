var User 		= require('../../models/user');

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
			
		var user = new User();

		// FOR THE LOVE OF GOD HASH PASSWORD IDIOT
		user.password 	= req.body.password;
		user.username 	= req.body.username;
		user.admin 		= false;

		User.create(user, function (err, createdUser) {
			if (err) {
				return next(err);
			}

			res.status(200).send({
				message: 'success',
				username: createdUser.username,
				success: true
			});
		});
	});

	app.put(baseUrl + '/:id', function (req, res, next) {

		User.findById(req.params.id, function (err, user) {
			if (err) {
				return res.send(err);
			} else {
				user.username 	= req.body.username;
				user.password 	= req.body.password;
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
}

module.exports = routes;
