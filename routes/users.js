var express 	= require('express');
var router 		= express.Router();

var User 		= require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
	
	User.find(function(err, users) {
		if (err) {
			res.send(err);
		}

		res.json(users);
	});

});

router.get('/:id', function (req, res, next) {

	User.findById(req.params.id, function(err, user) {
		if (err) {
			res.send(err);
		}

		res.json(user);
	});

});

/* POST new user */
router.post('/', function (req, res, next) {
	if (!req.body.username || req.body.username.length < 4) {
		res.status(400)
		   .send({
		   	'message': 'missing username'
		   });
	} else if (!req.body.password || req.body.password.length < 12) {
		res.status(400)
		   .send({
		   	'message': 'password missing or too short'
		   });
	} else {
		
		var user = new User();

		user.password = req.body.password;
		user.username = req.body.username;

		User.create(user, function(err, createdUser) {
			if (err) {
				res.send(err);
			}

			res.status(200).send({
				message: 'success',
				username: createdUser.username
			});
		});
	}

});

router.put('/:id', function (req, res, next) {

	User.findById(req.params.id, function(err, user) {
		if (err) {
			res.send(err);
		}

		user.username = req.body.username;
		user.password = req.body.password;

		user.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.json({user});
		});
	});

});

module.exports = router;
