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
  
.controller('DashCtrl', function($scope, $ionicModal) {


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


