console.log('loading Pet model');
var mongoose = require('mongoose');

//Schema to be added to the Pet model
var PetSchema = new mongoose.Schema({
	name: {type: String, required: true},
	breed: {type: String, required: true},
	age: {type: Number, required: true},
	owner: {type: String, required: true},


})
mongoose.model('Pet', PetSchema);