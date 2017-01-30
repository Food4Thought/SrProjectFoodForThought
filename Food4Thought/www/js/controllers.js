angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {}) 

.controller('NotCtrl', function($scope) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//  
	//$scope.$on('$ionicView.enter', function(e) {
	//});
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingsCtrl', function($scope) {
	$scope.settings = { 
		enableFriends: true
	};  
});

$scope.startData = {};

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
