var Item 		= require('../../models/item');
var jwt 		= require('jsonwebtoken');
var isAuthenticated = require('./../util').isAuthenticated

var routes = function(app) {

	var baseUrl = app.get('baseUrl') + '/items';

	app.get(baseUrl + '/', isAuthenticated, function (req, res, next) {
		if (err) {
			return next(err);
		}
		res.json({"status":"success","success":true});
	});
};

module.exports = routes;
