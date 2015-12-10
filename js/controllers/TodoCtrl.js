app.controller('TodoCtrl', 
	['$scope',
		'$window',
	function($scope, $window){

		// Initially show our completed todos
		$scope.showCompleted = true;
		$scope.filterExpression = '';

		// Our todo items with a few seeded
		$scope.items = [
			{
				text: "Do laundry",
				dueDate: new Date('12/20/2015'),
				completed: false
			},
			{
				text: "Sign up for classes",
				dueDate: new Date('12/21/2015'),
				completed: true
			},
			{
				text: "Pay bills",
				dueDate: new Date('12/24/2015'),
				completed: false
			}
		];

		// Create a new Todo from our form at the 
		// top of the page.
		$scope.createTodo = function(){
			$scope.items.push({
				text: $scope.text,
				dueDate: new Date($scope.dueDate),
				completed: false
			});
			// Clear out inputs
			$scope.text = null;
			$scope.dueDate = null;
		};

		// affectCompleted will look at the value of showCompleted 
		// and will either hide/show the completeds accordingly
		$scope.affectCompleted = function(){
			if($scope.showCompleted == true){
				$scope.showCompleted = false;
				$scope.filterExpression = {completed: false};
			} else {
				$scope.showCompleted = true;
				$scope.filterExpression = '';
			}
		}

		// clearCompleted will clear all of our completeds from the 
		// items with a foreach loop.
		$scope.clearCompleted = function(){
			// Will get filled with indexes to remove
			cleanup = []
			angular.forEach($scope.items, function(item, i){
				if(item.completed == true){
					cleanup.push(i);
				}
			});
			// Pass true if you're passing an array
			$scope.destroyTodos(cleanup);
		};

		// Destroy todos given an array of todos or a single todo
		$scope.destroyTodos = function(todos){
			// Check if we have an array, otherwise, check
			// if we have a number.
			if(typeof(todos) == "object"){
				// QUESTION: I'm reversing the array here so that
				// I don't delete the top items first and then fudge
				// up my array orders/indexes. Is there a better way to do this?
				todos.sort(function(a,b){return b-a});
				angular.forEach(todos, function(todo){
					$scope.items.splice( todo, 1 );
				});
			}else if(typeof(todos) == "number"){
				$scope.items.splice( todos, 1 );
			}
		}
	}]);



// Controller syntax: 
// app.controller takes two arguments, a string (the controller name)
// and an array. The Array gets injected the services (wich $scope being the minimum)
// and ends in a function which contains the 'meat' of the controller.
// Just writing this out to have it stick a bit more.