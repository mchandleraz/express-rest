module.exports = function(app) {
	require('./routes/users')(app);
	require('./routes/items')(app);
};