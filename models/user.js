var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 4
	},
	password: {
		type: String,
		required: true,
		minlength: 12
	}
});

module.exports = mongoose.model('User', UserSchema);
