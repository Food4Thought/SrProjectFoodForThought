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

	var currentShiftIndex;
	var currentUncheckedVols = [];
	var currentCheckedVols = [[]];
    function getItems () {
		//  TODO
		//	Hide shift selector when there's only one shift for the current day
		//  Change volunteer list when a new shift is selected [DEBUG]

		$scope.$watch('data.items');

		$scope.doRefresh = function(selector) {
			currentUncheckedVols[currentShiftIndex] = $scope.uncheckedVolunteers;
			currentCheckedVols[currentShiftIndex] = $scope.checkedVolunteers;	
			$scope.uncheckedVolunteers = currentUncheckedVols[selector.options[selector.selectedIndex].value];
			$scope.checkedVolunteers = currentCheckedVols[selector.options[selector.selectedIndex].value];
			currentShiftIndex = selector.options[selector.selectedIndex];
			$scope.$broadcast('scroll.refreshComplete');
		};


		window.updateShifts = function updateShifts(selector){
			$scope.doRefresh(selector);
		}

		var shift1Vols = ["Jim Sanchez", "Carl Wheezer", "Dwayne 'The Rock' Johnson", "Marge Simpson"];
		var shift2Vols = ["Slaton Spangler", "Kyle Knight", "Darren White", "Darren Black", "John Cena", "Barry White"];
		currentUncheckedVols.push(shift1Vols);
		currentUncheckedVols.push(shift2Vols);

		var shiftNames = ["3/2/17 - CU Boulder", "ANOTHER PLACE"];
		var shiftSelector = document.createElement('select');
		shiftSelector.setAttribute("onChange", "updateShifts(this);");
		for(var i = 0; i < shiftNames.length; i++){
			//Dynamically creating shift selector
			var opt = document.createElement("option");
			opt.value = i;
			opt.innerHTML = shiftNames[i]; 
			shiftSelector.appendChild(opt);
		}
		
		document.getElementById("shiftSelector").appendChild(shiftSelector);
		var uncheckedVolunteers;
		var checkedVolunteers;
		//This is where we'll put the call to get the volunteer lists for shifts occuring 'today'
	
		for(var i = 0; i < currentUncheckedVols.length; i++){
			for(var j = 0; j < currentUncheckedVols[i].length; j++){
				currentUncheckedVols[i][j] = ({text: currentUncheckedVols[i][j], selected: false, deleted: false});
			}
			currentShiftIndex = 0;
			$scope.uncheckedVolunteers = currentUncheckedVols[currentShiftIndex];
			$scope.checkedVolunteers = currentCheckedVols[currentShiftIndex];
			//console.log($scope.uncheckedVolunteers);
		}
	}

	$scope.hide = "";
	$scope.removeItems = function () { 
		for(var i = $scope.uncheckedVolunteers.length -1; i >= 0; i--){ //Traversing backwards to preserve indices of yet-to-be-reoved items
			if($scope.uncheckedVolunteers[i].selected){
				$scope.uncheckedVolunteers[i].deleted = true;
				var removed = $scope.uncheckedVolunteers.splice(i, 1);
				console.log(removed[0]);
				console.log("KJADJFKADJ");
				console.log($scope.checkedVolunteers);
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


