console.log('Loading app.js');

 // Angular setup
 var app = angular.module('app', ['ngRoute', 'ngMessages']);

 app.config(function($routeProvider){
 	$routeProvider
 		.when('/pets', {
 			templateUrl: '/partials/pets.html',
 			controller: 'petsController'
 		})
 		.when('/new', {
 			templateUrl: '/partials/new.html',
 			controller: 'indController'
 		})
 		.when('/:id',{
 			templateUrl: '/partials/view.html',
 			controller: 'indController'
 		})
 		.when('/edit/:id', {
 			templateUrl: 'partials/edit.html',
 			controller: 'indController'

 		})
 		.when('/delete/:id', {
 			templateUrl: '/partials/deleted.html',
 			controller: 'deleteController'
 		})
 		.otherwise({
 			// templateUrl: '/partials/pets.html',
 			// controller: 'petsController'
 			redirectTo: '/pets'

 		})
 })

 // FACTORY SETUP
 app.factory('petFactory', ['$http', function($http){
 	var pets = {}
 	// {name:'Frankie', age: 12, breed: 'Black Lab', owner: 'Gaston'},
 	// {name:'Lilly', age: 2, breed: 'Westy', owner: 'Jacky'},
 	// {name:'Clancy', age: 32, breed: 'Black Lab', owner: 'Michael'},



 	// ];

 	// console.log(pets);
 	var factory ={};
 	$http.get('/pets').then(function(returnedData){
 		console.log('grabbing initial pets data list')
 		pets = returnedData.data;
 		console.log('pets are:', pets)


 	})
 	// factory.index = function($scope){
 	// 	console.log('In factory.index, going to call: ')
 	// 	$scope.pets = pets
 	// 	// $scope.$apply()
 	// 	// callback(pets)

 	// 	// $http.get('/pets').then(function(returnedData){
 	// 	// 	// console.log('Got pets, now running .then function', returnedData.data)
 	// 	// 	pets = returnedData.data
 	// 	// 	callback(pets);
 	// 	// })
 	// }
 	// 	// callback(pets)
 	factory.index = function(callback){
		$http.get('/pets').then(function(data){
			console.log('data is', data.data);
			callback(data.data);
			ships = data.data;
			// console.log('compare', ships[0],' to data.data:', data.data[0]);
		});
	}




 	factory.getPet = function($routeParams, callback){
 		console.log('In factory to get pet',$routeParams )
 		for(x in pets){
 			console.log(pets[x])
 			if(pets[x]._id == $routeParams.id){
 				console.log('found one', pets[x]);
 				callback(pets[x])
 			}
 		}
 		// callback();
 	}
 	factory.createPet = function($scope){
 		pets.push($scope.newPet);
 		var myNewPet = $scope.newPet
 		console.log('pushed ', myNewPet, ' into pets aray')
 		// $scope.pets = pets;
 		$http.post('/pets', myNewPet)
 		// .then(function(response){
 		// 	console.log('sending pet info to server')
 		// 	// console.log(response,' is the response from the server')
 		// });
 	}
 	factory.updatePet = function(editPet, $routeParams, callback){
 		console.log('In petFactory update', editPet)
 		for(x in pets){
 			if(pets[x]._id == editPet._id){
 				console.log(editPet, 'Matches', pets[x]);
 				pets[x] = editPet;
 				console.log('modified pet is', pets[x])




 			}else{
 				console.log( x, 'is not a match.', pets[x]._id);
 			}
 			callback(pets);
 			$http.post('pets/'+ $routeParams.id, editPet).then(function(response){
 				console.log('After updating pet, response from server is:', response);
 			})
 			window.location.href = '#/pets';

 		}
 	}
 	factory.removePet = function($scope, $routeParams, callback){
 		console.log('In factory.removePet', $routeParams.id);
 		for(x in pets){
 			if(pets[x]._id == $routeParams.id){
 				console.log('Found:', pets[x]);
 				$scope.pet = pets[x];
 				pets.splice(x, 1);
 				// callback(pets);
 				$scope.pets = pets;
 				// var myRoute = '/'
 				$http.post('/delete/'+$routeParams.id).then(function(){
 				console.log('sent data to delete:')
 				})
 			}

 			// index();
 			// else{
 			// 	console.log(pets[x]._id, ' Does not match', $routeParams.id)
 			// }
 		}
 		// window.location.href = '#/pets';


 	}


 	return factory;

 }])




// CONTROLLER SETUP
app.controller('petsController', ['$routeParams', '$scope', 'petFactory', '$location', function($routeParams, $scope, petFactory, $location){
	// setTimeout(function(){
		petFactory.index(function(data){
			$scope.pets = data;
			console.log('$scope.pets is now', $scope.pets);

		})


	// 	, function(data){
	// 		// $scope.pets = data
	// 		console.log('running callback in factory and $scope.pets = ', $scope.pets);
	// 		 $scope.$apply()


	// 	})
	// }, 1000)




}])

app.controller('indController', ['$routeParams', '$scope', 'petFactory', '$location', function($routeParams, $scope, petFactory, $location){


	petFactory.getPet($routeParams, function(data){
		console.log('routeParams:', $routeParams)
		$scope.pet = data;
		$scope.editPet = data

	})
	$scope.addPet = function(){
		console.log('In add pet.', $scope.newPet);
		petFactory.createPet($scope);
		window.location.href = '#/pets';

	}

	$scope.updatePet = function(editPet){
		console.log('In scope.updatePet', editPet);
		petFactory.updatePet(editPet, $routeParams, function(data){
			$scope.pets = data
			console.log('Scope.pets is now', $scope.pets)
			// $scope.$apply()



		});
	}



}])
app.controller('deleteController', ['$routeParams', '$scope', 'petFactory', '$location', function($routeParams, $scope, petFactory, $location){


	petFactory.removePet($scope, $routeParams, function(data){
		console.log('routeParams:', $routeParams)
		$scope.pets =data


	})
}])




// Useful
 					// window.location.href = '#/pets';





