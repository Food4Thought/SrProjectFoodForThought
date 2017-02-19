angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicModal) {
	$scope.tasks = [ 
	{taskLocation: 'blah', taskDate: '12/5/12', taskOrg: 'fft'}
	];

	$scope.createTask = function(task) {
		$scope.tasks.push({
			taskLocation: task.taskLocation,
			taskDate: task.taskDate,
			taskOrg: task.taskOrg
		}); 
		task.taskLocation = ""; 
		task.taskDate = ""; 
		task.taskOrg = ""; 
	};

	// Sign Up Modal
	$ionicModal.fromTemplateUrl('templates/newShift.html', {
		id: '1',
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.signUpModal = modal;
	});


	// Check-in Modal
	$ionicModal.fromTemplateUrl('templates/start.html', {
		id: '2',
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.checkInModal = modal;
	});

	$scope.openModal = function(modalID) {
		if(modalID == 1) $scope.signUpModal.show();
		else $scope.checkInModal.show();
		//$scope.checkInModal.show();
	};
	$scope.closeModal = function() {
		if(modalID == 1) $scope.signUpModal.hide();
		else $scope.checkInModal.hide();
	};

	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.signUpModal.remove();
		$scope.checkInModal.remove();
	});
}) 

.controller('NotCtrl', function($scope) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//  
	//$scope.$on('$ionicView.enter', function(e) {
	//});

})


.controller('NotificationsCtrl', function($scope) {
	$scope.notificationsUrgent = [
	{ title: "snowman apocalypse" },
	{ title: "blah" }
	];

	$scope.notificationsInfo = [
	{title: "something cool and informative, yay kids!"}
	];

	$scope.createUrgent = function(notification) {
		$scope.notificationsUrgent.push({
			title: notification.title
		});
		notification.title = "";
	};
	$scope.createInfo = function(notification) {
		$scope.notificationsInfo.push({
			title: notification.title
		});
		notification.title = "";
	};

})

.controller('Admin-NotCtrl', function($scope, $ionicModal) {
	
	// Sign Up Modal
	$ionicModal.fromTemplateUrl('templates/newShift.html', {
		id: '1',
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.signUpModal = modal;
	});


	// Check-in Modal
	$ionicModal.fromTemplateUrl('templates/start.html', {
		id: '2',
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.checkInModal = modal;
	});

	$scope.openModal = function(modalID) {
		if(modalID == 1) $scope.signUpModal.show();
		else $scope.checkInModal.show();
		//$scope.checkInModal.show();
	};
	$scope.closeModal = function() {
		if(modalID == 1) $scope.signUpModal.hide();
		else $scope.checkInModal.hide();
	};

	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.signUpModal.remove();
		$scope.checkInModal.remove();
	});
})

.controller('AdminCtrl', function($scope, $state) {
	 
})

.controller('SettingsCtrl', function($scope) {
	$scope.settings = { 
		enableFriends: true
	};  
});


