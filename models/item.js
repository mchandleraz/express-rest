var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Item', ItemSchema);
