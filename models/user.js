var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 4
	},
	// hash it nerd.
	password: {
		type: String,
		required: true,
		minlength: 12
	},
	admin: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('User', UserSchema);
