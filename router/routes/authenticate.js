var express 	= require('express');
var app			= express();
var router 		= express.Router();

var User 		= require('../models/user');

var jwt 		= require('jsonwebtoken');

router.post('/', function(req, res) {

	User.findOne({
		username: req.body.username
	}, function(err, user) {
		if (err) {
			return res.send(err);
		}

		if (!user) {
			return res.json({
				success: false,
				message: 'Aith failed. User not found'
			});
		}

		if (user.password != req.body.password) {
			return res.json({
				success: false,
				message: 'Auth failed. bad pass dawg'
			});
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

module.exports = router;
