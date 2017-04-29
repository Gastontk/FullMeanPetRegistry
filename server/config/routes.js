console.log('Loading routes file');

var path = require('path');
var pets = require('./../controllers/pets.js');
// console.log(pets.index)
module.exports = function(app){
	app.get('/pets', pets.index);
	app.post('/delete/:id', pets.delete);
	app.post('/pets', pets.create);
	app.post('/pets/:id', pets.update);




}