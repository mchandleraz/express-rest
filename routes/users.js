var express 	= require('express');
var router 		= express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(501)
  	 .send();
});

/* POST new user */
router.post('/', function(req, res, next) {
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
		res.status(501)
		   .send();
	}

});

module.exports = router;
