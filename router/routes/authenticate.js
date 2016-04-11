var User 		= require('../../models/user');
var jwt 		= require('jsonwebtoken');

var routes = function(app) {
	
	var baseUrl = app.get('baseUrl') + '/authenticate';

	app.get(baseUrl, function(req, res, next) {
		res.json({'success':true});
	})

	app.post(baseUrl, function(req, res, next) {

		User.findOne({
			username: req.body.username
		}, function(err, user) {
			if (err) {
				return res.send(err);
			}

			var token = jwt.sign(user, req.app.get('superSecret'), {
				expiresIn: 86400
			});

			res.status(200).json({
				success: true,
				token: token
			});

		});
	});
}

module.exports = routes;
