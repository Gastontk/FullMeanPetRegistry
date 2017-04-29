console.log('Loading Pets controller')
// requirements for friendsController to have access to everything it needs:
var mongoose = require('mongoose');
var Pet = mongoose.model('Pet');
function PetsController(){
	// Pet.create({name: 'Bay', breed: 'Horse', age: 12, owner: 'Rich Bastard'}, function(err, result){
	// 	if(err){
	// 		console.log('Could not save the pet info', err)
	// 	}else{
	// 		console.log('Saved: result is:', result)
	// 	}


	// })
	this.index = function(req, res){
		console.log('In petsController.index');
		Pet.find({}, function(err, results){
			res.json(results)
		})
	}
	this.delete = function(req, res){
		Pet.findOne( {_id: req.params.id} ).remove(function(err,data){
			console.log(err, 'data is:', data.result)
		})
		// .exec();
		console.log('In petscontroller.delete',req.params)

	}
	this.create = function(req, res){
		console.log(req.body, ' Is what will be saved')
		var newPet = new Pet(req.body);
		newPet.save(function(err, createdPet){
			console.log('response from server', err, createdPet)
				Pet.find({}, function(err, results){
					res.json(results)
				})

			})
	}
	this.update = function(req, res){
		console.log('In petsController.update ', req.body, 'params are', req.params.id)
		Pet.findById(req.params.id, function(err, pet){
			console.log('response from server:', err, pet);
			pet.update(req.body, function(err, response){
				if(err){
					console.log(err);
				}
				else{
					console.log('success', response);
				}
			})
		});
	}

}
module.exports = new PetsController