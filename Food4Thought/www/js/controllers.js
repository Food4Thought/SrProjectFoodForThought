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
	$ionicModal.fromTemplateUrl('templates/admin/modals/newShift.html', {
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

	// Edit Notification Modal
	$ionicModal.fromTemplateUrl('templates/admin/modals/editNotification.html', {
		id: '1',
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.signUpModal = modal;
	});


	// New Notification Modal
	$ionicModal.fromTemplateUrl('templates/admin/modals/newNotification.html', {
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

.controller('Admin-LocCtrl', function($scope, $ionicModal) {

	// Edit Location Modal
	$ionicModal.fromTemplateUrl('templates/admin/modals/editLocation.html', {
		id: '1',
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.signUpModal = modal;
	});


	// New Location Modal
	$ionicModal.fromTemplateUrl('templates/admin/modals/newLocation.html', {
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

.controller('CheckinCtrl', function($scope, $state, $ionicFilterBar, $timeout) {
	 var filterBarInstance;

    function getItems () {
		var people = ["Slaton Spangler", "Kyle Knight", "Darren White", "Darren Black", "John Cena", "Barry White"];
		var uncheckedVolunteers = [];
		var checkedVolunteers = [];

		for(var i = 0; i < people.length; i++){
			uncheckedVolunteers.push({text: people[i], selected: false, deleted: false});
		}
		$scope.uncheckedVolunteers = uncheckedVolunteers;
		$scope.checkedVolunteers = checkedVolunteers;
	}

	//TODO: animation
	//		add checked in volunteers to another list... somewhere? ('see checked in volunteers' button?)
	//		switch between shifts that occur on the same day (slide animation?)
	//		

	$scope.hide = "";
	$scope.removeItems = function () { 
		for(var i = $scope.uncheckedVolunteers.length -1; i >= 0; i--){ //Traversing backwards to preserve indices of yet-to-be-reoved items
			if($scope.uncheckedVolunteers[i].selected){
				$scope.uncheckedVolunteers[i].deleted = true;
				var removed = $scope.uncheckedVolunteers.splice(i, 1);
				console.log(removed[0]);
				$scope.checkedVolunteers.push(removed[0]);
				console.log(i)
			}
		}
		console.log($scope.uncheckedVolunteers);	
	}; 

    getItems();

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.uncheckedVolunteers,
        update: function (filteredItems, filterText) {
          $scope.uncheckedVolunteers = filteredItems;
		},

		done: function(){
			console.log("HIDE!");
			$scope.hide = "hidden";
		},

		cancel: function (){
			$scope.hide = "";
			for(var i = $scope.uncheckedVolunteers.length-1; i >= 0; i--){
				if($scope.uncheckedVolunteers[i].deleted){
					$scope.uncheckedVolunteers.splice(i, 1);
					console.log(i)			
				}
			}
			console.log($scope.uncheckedVolunteers);
		}
      });
    };

    $scope.refreshItems = function () {
      if (filterBarInstance) {
        filterBarInstance();
        filterBarInstance = null;
		
      }

      $timeout(function () {
        getItems();
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };
})

.controller('AdminCtrl', function($scope, $state) {
	 
})

.controller('SettingsCtrl', function($scope) {
	$scope.settings = { 
		enableFriends: true
	};  
});


