var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var bcrypt = require('bcrypt');
var saltRounds = 10;

var UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 4,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 12,
		trim: true
	},
	admin: {
		type: Boolean,
		required: true
	}
});

// TODO: make this asynchronous!
// Hashing a password synchronously
UserSchema.methods.encryptPassword = function (password) {
	if (password.length < 12) {
		return password;
	} else {
		var salt = bcrypt.genSaltSync(saltRounds);
		return bcrypt.hashSync(password, salt);
	}
};

UserSchema.methods.decryptPassword = function (password, hash) {
	return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model('User', UserSchema);
