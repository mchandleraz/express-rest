var jwt 		= require('jsonwebtoken');
var app			= require('express')();

module.exports = {
	isAuthenticated: function(req, res, next) {
		
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		if (!token) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.'
			});
		}

		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({
					success: false,
					message: 'Failed to authenticate token.'
				});		
			} else {
				req.decoded = decoded;	
				next();
			}
		});
	}
}