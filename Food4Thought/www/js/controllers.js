angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicModal, $timeout) {
	//Here is the stuff to start our shift
	$scope.startData = {}; 

	$scope.shifts = [
	{date: '2/24/17', loc: 'Metro Campus', organization: 'Food4Thought'},
	{date: "3/19/17", loc: "Metro Campus", organization: "Food4Thought"},
	{date: "4/21/17", loc: "Golden Church", organization: "Golden Backpack"}
	];

	$ionicModal.fromTemplateUrl('templates/start.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.startModal = modal;
	}); 

	$scope.closeStart = function() {
		$scope.startModal.hide();
	};  

	$scope.start = function() {
		$scope.startModal.show();
	};  

	$scope.doStart = function() {
		console.log('Starting Shift', $scope.startData);

		//get time and send to server
		$timeout(function() {
			$scope.closeStart();
		}, 1000);
	};

	$ionicModal.fromTemplateUrl('templates/newShift.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.newShiftModal = modal;
	});

	$scope.closeNewShift = function() {
		$scope.newShiftModal.hide();
	};

	$scope.newShift = function() {
		$scope.newShiftModal.show();
	};

	$scope.doNewShift = function() {
		console.log('Finding New Shift', $scope.newShiftData);

		//get time and send to server
		$timeout(function() {
			$scope.closeNewShift();
		}, 1000);
	};
	$ionicModal.fromTemplateUrl('templates/confirmNew.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.confirmNewModal = modal;
	});

	$scope.closeConfirmNew = function() {
		$scope.confirmNewModal.hide();
	};

	$scope.confirmNew = function() {
		$scope.confirmNewModal.show();
	};

	$scope.doConfirmNew = function() {
		console.log('Confirming New Shift', $scope.confirmNewData);

		//get time and send to server
		$timeout(function() {
			$scope.closeNewShift();
		}, 1000);
	};

	$scope.goTourl = function(path) {
		$location.path(path);
	};
})
 

.controller('NotificationsCtrl', function($scope) {
	$scope.notifications = [
	{ title: "snowman apocalypse" },
	{ title: "blah" }
	];
})

.controller('SettingsCtrl', function($scope) {
	$scope.settings = { 
		enableFriends: true
	};  
});
