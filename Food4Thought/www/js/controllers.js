angular.module('starter.controllers', [])


.controller('WelcomeCtrl', function($state, $scope, $localStorage){
	//TODO: On entering info, add to local storage and redirect to main screen
	//		
	$scope.userData = {};
	$scope.$storage = $localStorage;
	$scope.$storage = $localStorage.$default({
		firstTime: true,
		currentUser: null,
		users: {}
	});
	var vm = this;
	vm.storeCredentials = storeCredentials;	

	console.log($scope.$storage.firstTime);
	if($scope.$storage.firstTime == false){
		$state.go('tab.home');
	}

	function storeCredentials(){
		if(vm.welcomeForm.$valid){
			$scope.$storage.firstTime = false;	

			$scope.$storage.users[$scope.userData.email] = {
				firstName: $scope.userData.firstName,
				lastName: $scope.userData.lastName,
				email: $scope.userData.email,
				phoneNumber: $scope.userData.phoneNumber
			};
			console.log($scope.$storage.users);
			$scope.$storage.currentUser = $scope.$storage.users[$scope.userData.email]; 

			$state.go('tab.home');
		}
		else{
			console.log("Form was invalid, doing nothing");
		}
	}
})
.controller('LoginCtrl', function($state, $scope, $localStorage){
	//TODO:
	//Check if form is valid!
	//Check if email is in $scope.$storage.users
	//If so, set current user and goto home (need to create 'current user' var)
	//If not, tell the user (use form error css, yo.), suggesting there was a typo, or that they don't have their info registered

	$scope.$storage = $localStorage;

	$scope.userData = {};

	var vm = this;
	vm.login = login;
	vm.resetUserMatchError = resetUserMatchError;

	function resetUserMatchError(){
		vm.loginForm.email.$error.noUserMatch = false;
		vm.loginForm.$submitted = false;
	}

	function login(){

		if(vm.loginForm.$valid){
			if($scope.userData.email in $scope.$storage.users){
				vm.loginForm.email.$error.noUserMatch = false;
				currentUser = $scope.$storage.users[$scope.userData.email];
				console.log(currentUser);
				$state.go('tab.home');
			}
			else{
				vm.loginForm.email.$error.noUserMatch = true;
				console.log("No match");	
			}
		}
	}
})
	//User is in list of users. Set them as active user and navigate to home page

	//look for $scope.userData.email in $scope.$storage.users

.controller('HomeCtrl', function(ShiftFactory, LocFactory, $scope, $ionicModal) {
	$scope.shifts = ShiftFactory.getList();
	$scope.locations = LocFactory.getList();

	$scope.clothInfo = "Please wear comfortable clothing and dress for working in an outdoor covered location.";

	$scope.toggleShift = function(shift) {
		if($scope.isShiftShown(shift)) {
			$scope.shownShift = null;
		} else {
			$scope.shownShift = shift;
		}
	};
	$scope.isShiftShown = function(shift) {
		return $scope.shownShift === shift;
	};

	$scope.launchMaps = function(address, city, state, zipCode){
		if(ionic.Platform.isIOS()){
			window.location.href = "maps://maps.apple.com/?daddr=" + address + city + state + zipCode;
		}
		else if(ionic.Platform.isAndroid()){
			window.location.href = "geo:?q=" + address + city + state + zipCode;
		}
		else{
			window.location.href = "https://www.google.com/maps/place/" + address + city + state + zipCode;
		}
	};

	function pickNewShiftModal () {
		if(ionic.Platform.isIOS()){
			return ('templates/newShiftModals/ios.html');
		}
		else if(ionic.Platform.isAndroid()){
			return ('templates/newShiftModals/android.html');
		}
		else {
			return ('templates/newShiftModals/web.html');
		}
	}

	// Sign Up Modal
	$ionicModal.fromTemplateUrl(pickNewShiftModal(), function(modal) {
		$scope.signUpModal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});
	// Check-in Modal
	$ionicModal.fromTemplateUrl('templates/start.html', function(modal) {
		$scope.checkInModal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});

	$scope.showSignUp = function() {
		$scope.signUpModal.show();
	};
	$scope.showCheckIn = function(item) {
		$scope.tmpItem = item;
		$scope.checkInModal.show();
	};

	$scope.leaveSignUp = function() {
		$scope.signUpModal.remove();
		$ionicModal.fromTemplateUrl(pickNewShiftModal(), function(modal) {
			$scope.signUpModal = modal;
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});
	};
	$scope.leaveCheckIn = function() {
		$scope.checkInModal.remove();
		$ionicModal.fromTemplateUrl('templates/start.html', function(modal) {
			$scope.checkInModal = modal;
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});
	};

	$scope.openModal = function(modalID) {
		if(modalID == 1) $scope.signUpModal.show();
		else $scope.checkInModal.show();
		//$scope.checkInModal.show();
	};
	$scope.closeModal = function(modalID) {
		$scope.signUpModal.hide();
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


.controller('NotificationsCtrl', function(UrgentFactory, InfoFactory, $scope, $ionicModal) {
	// load the add/change dialog from the given template url
	$ionicModal.fromTemplateUrl('templates/admin/modals/urgent-dialog.html', function(modal) {
		$scope.addUrgentDialog = modal;
	},  {
		scope: $scope,
		animation: 'slide-in-up'
	});
	$ionicModal.fromTemplateUrl('templates/admin/modals/info-dialog.html', function(modal) {
		$scope.addInfoDialog = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});
  $ionicModal.fromTemplateUrl('templates/admin/modals/confirmUrgentDelete.html', function(modal) {
    $scope.confirmUrgentDelete = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $ionicModal.fromTemplateUrl('templates/admin/modals/confirmInfoDelete.html', function(modal) {
    $scope.confirmInfoDelete = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

	$scope.showAddChangeUrgent = function(action) {
		$scope.urgentAction = action;
		$scope.addUrgentDialog.show();
	};
	$scope.showAddChangeInfo = function(action) {
		$scope.infoAction = action;
		$scope.addInfoDialog.show();
	};
  $scope.showUrgentDelete = function(item) {
    $scope.tmpUrgentDelete = item;
    $scope.confirmUrgentDelete.show();
  };
  $scope.showInfoDelete = function(item) {
    $scope.tmpInfoDelete = item;
    $scope.confirmInfoDelete.show();
  };

	$scope.leaveAddChangeUrgent = function() {
		// remove dialog
		$scope.addUrgentDialog.remove();
		// reload modal template to have cleared form
		$ionicModal.fromTemplateUrl('templates/admin/modals/urgent-dialog.html', function(modal) {
			$scope.addUrgentDialog = modal;
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});
	};
	$scope.leaveAddChangeInfo = function() {
		//remove dialog
		$scope.addInfoDialog.remove();
		//reload modal template to have cleared form
		$ionicModal.fromTemplateUrl('templates/admin/modals/info-dialog.html', function(modal) {
			$scope.addInfoDialog = modal;
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});
	};
  $scope.leaveUrgentDelete = function() {
    $scope.confirmUrgentDelete.remove();
    $ionicModal.fromTemplateUrl('templates/admin/modals/confirmUrgentDelete.html', function(modal) {
      $scope.confirmUrgentDelete = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
  };
  $scope.leaveInfoDelete = function() {
    $scope.confirmInfoDelete.remove();
    $ionicModal.fromTemplateUrl('templates/admin/modals/confirmInfoDelete.html', function(modal) {
      $scope.confirmInfoDelete = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
  };

	$scope.urgent = UrgentFactory.getList();
	$scope.info = InfoFactory.getList();

	$scope.saveEmpty = function(form) {
		$scope.notifForm = angular.copy(form);
	};

	$scope.urgentSaveEmpty = function(form) {
		$scope.urgentForm = angular.copy(form);
	};

	$scope.addUrgent = function(form) {
		var newItem = {};
		// add values from form to object
		newItem.description = form.description.$modelValue;
		// save new list in scope and factory
		$scope.urgent.push(newItem);
		UrgentFactory.setList($scope.urgent);
		// close dialog
		$scope.leaveAddChangeUrgent();
	};
	$scope.addInfo = function(form) {
		var newItem = {};
		// add values from form to object
		newItem.description = form.description.$modelValue;
		// save new list in scope and factory
		$scope.info.push(newItem);
		InfoFactory.setList($scope.info);
		// close dialog
		$scope.leaveAddChangeInfo();
	};

	$scope.removeUrgent = function(item) {
		// search & destroy item from list
		$scope.urgent.splice($scope.urgent.indexOf(item), 1);
		// if this item was the default we set first item in list to default
		// save list in factory
		UrgentFactory.setList($scope.urgent);
    $scope.leaveUrgentDelete();
	};
	$scope.removeInfo = function(item) {
		// search & destroy item from list
		$scope.info.splice($scope.info.indexOf(item), 1);
		// if this item was the default we set first item in list to default
		// save list in factory
		InfoFactory.setList($scope.info);
    $scope.leaveInfoDelete();
	};

	$scope.showEditUrgent = function(item) {
		// remember edit item to change it later
		$scope.tmpEditUrgent = item;
		// preset form values
		$scope.urgentForm.description.$setViewValue(item.description);
		// render updated view value
		$scope.urgentForm.description.$render();
		// open dialog
		$scope.showAddChangeUrgent('change');
	};
	$scope.showEditInfo = function(item) {
		// remember edit item to change it later
		$scope.tmpEditInfo = item;
		// preset form values
		$scope.notifForm.description.$setViewValue(item.description);
		// render updated view value
		$scope.notifForm.description.$render();
		// open dialog
		$scope.showAddChangeInfo('change');
	};

	$scope.editUrgent = function(form) {
		var item = {};
		item.description = form.description.$modelValue;

		var editIndex = UrgentFactory.getList().indexOf($scope.tmpEditUrgent);
		$scope.urgent[editIndex] = item;
		// set first item to default
		UrgentFactory.setList($scope.urgent);
		$scope.leaveAddChangeUrgent();
	};
	$scope.editInfo = function(form) {
		var item = {};
		item.description = form.description.$modelValue;

		var editIndex = InfoFactory.getList().indexOf($scope.tmpEditInfo);
		$scope.info[editIndex] = item;
		// set first item to default 
		InfoFactory.setList($scope.info);
		$scope.leaveAddChangeInfo();
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

.controller('Admin-TimesCtrl', function(LocFactory, ShiftFactory, JobFactory, $scope, $ionicModal) {
	$scope.shifts = ShiftFactory.getList();
	$scope.locations = LocFactory.getList();
	$scope.jobs = JobFactory.getList();

	$ionicModal.fromTemplateUrl('templates/admin/modals/timesModal.html', function(modal) {
		$scope.timeModal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});
  $ionicModal.fromTemplateUrl('templates/admin/modals/confirmTimeDelete.html', function(modal) {
    $scope.confirmDelete = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

	$scope.showTimeModal = function(action) {
		$scope.timeAction = action;
		$scope.timeModal.show();
	};
  $scope.showTimeDelete = function(item) {
    $scope.tmpTimeDelete = item;
    $scope.confirmDelete.show();
  };

	$scope.leaveTimeModal = function() {
		$scope.timeModal.remove();
		$ionicModal.fromTemplateUrl('templates/admin/modals/timesModal.html', function(modal) {
			$scope.timeModal = modal;
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});
	};
  $scope.leaveTimeDelete = function() {
    $scope.confirmDelete.remove();
    $ionicModal.fromTemplateUrl('templates/admin/modals/confirmTimeDelete.html', function(modal) {
      $scope.confirmDelete = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
  };

	$scope.saveEmpty = function(form) {
		$scope.timeForm = angular.copy(form);
	};

	$scope.removeTime = function(item) {
		$scope.shifts.splice($scope.shifts.indexOf(item), 1);
		ShiftFactory.setList($scope.shifts);
    $scope.leaveTimeDelete();
	};

	$scope.addTime = function(form) {
		var newItem = {};
		// add values from form to object
		newItem.locName = form.loc.$modelValue;
		var index = $scope.locations.map(function(item) {
			return item.name;
		}).indexOf(newItem.locName);
		newItem.locAddress = $scope.locations[index].address;
		newItem.locCity = $scope.locations[index].city;
		newItem.locState = $scope.locations[index].state;
		newItem.locZipCode = $scope.locations[index].zipCode;
		newItem.job = form.job.$modelValue;
		newItem.date = form.date.$modelValue;
		newItem.time = form.time.$modelValue;
		// save new item in scope and factory
		$scope.shifts.push(newItem);
		ShiftFactory.setList($scope.shifts);
		$scope.leaveTimeModal();
	};

	$scope.showEditTime = function(item) {
		$scope.tmpEditTime = item;
		$scope.timeForm.loc.$setViewValue(item.loc);
		$scope.timeForm.loc.$render();
		$scope.timeForm.date.$setViewValue(item.date);
		$scope.timeForm.date.$render();
		$scope.timeForm.time.$setViewValue(item.time);
		$scope.timeForm.time.$render();

		$scope.showTimeModal('change');
	};

	$scope.editTime = function(form) {
		var item = {};
		item.loc = form.loc.$modelValue;
		item.date = form.date.$modelValue;
		item.time = form.time.$modelValue;

		var editIndex = ShiftFactory.getList().indexOf($scope.tmpEditTime);
		$scope.shifts[editIndex] = item;
		ShiftFactory.setList($scope.shifts);
		$scope.leaveTimeModal();
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

.controller('Admin-LocCtrl', function(LocFactory, $scope, $ionicModal) {
	$scope.locations = LocFactory.getList();

	// Location Modal
	$ionicModal.fromTemplateUrl('templates/admin/modals/locationsModal.html', function(modal) {
		$scope.locationModal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});
  $ionicModal.fromTemplateUrl('templates/admin/modals/confirmLocationDelete.html', function(modal) {
    $scope.confirmDelete = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

	$scope.showLocationModal = function(action) {
		$scope.locAction = action;
		$scope.locationModal.show();
	};
  $scope.showConfirmDelete = function(item) {
    $scope.tmpLocDelete = item;
    $scope.confirmDelete.show();
  };

	$scope.saveEmptyLoc = function(form) {
		$scope.locForm = angular.copy(form);
	};

	$scope.showEditLocation = function(item) {
		$scope.tmpEditItem = item;
		// Preset form values
		$scope.locForm.name.$setViewValue(item.name);
		$scope.locForm.address.$setViewValue(item.address);
		$scope.locForm.city.$setViewValue(item.city);
		$scope.locForm.state.$setViewValue(item.state);
		$scope.locForm.zipCode.$setViewValue(item.zipCode);
		//render updated view value
		$scope.locForm.name.$render();
		$scope.locForm.address.$render();
		$scope.locForm.city.$render();
		$scope.locForm.state.$render();
		$scope.locForm.zipCode.$render();

		$scope.showLocationModal('change');
	};

	$scope.leaveLocationModal = function() {
		$scope.locationModal.remove();
		$ionicModal.fromTemplateUrl('templates/admin/modals/locationsModal.html', function(modal) {
			$scope.locationModal = modal;
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});
	};
  $scope.leaveConfirmDelete = function() {
    $scope.confirmDelete.remove();
    $ionicModal.fromTemplateUrl('templates/admin/modals/confirmLocationDelete.html', function(modal) {
      $scope.confirmDelete = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
  };

	$scope.addLocation = function(form) {
		var newItem = {};
		newItem.name = form.name.$modelValue.toString();
		newItem.address = form.address.$modelValue;
		newItem.city = form.city.$modelValue;
		newItem.state = form.state.$modelValue;
		newItem.zipCode = form.zipCode.$modelValue;
		$scope.locations.push(newItem);
		LocFactory.setList($scope.locations);
		$scope.leaveLocationModal();
	};
	$scope.editLocation = function(form) {
		var item = {};
		item.name = form.name.$modelValue;
		item.address = form.address.$modelValue;
		item.city = form.city.$modelValue;
		item.state = form.state.$modelValue;
		item.zipCode = form.zipCode.$modelValue;

		var editIndex = LocFactory.getList().indexOf($scope.tmpEditItem);
		$scope.locations[editIndex] = item;
		LocFactory.setList($scope.locations);
		$scope.leaveLocationModal();
	};

	$scope.removeLocation = function(item) {
		$scope.locations.splice($scope.locations.indexOf(item), 1);
		LocFactory.setList($scope.locations);
    $scope.leaveConfirmDelete();
	};
})

.controller('CheckinCtrl', function($scope, $state, $ionicFilterBar, $timeout) {

	var filterBarInstance;

	var currentShiftIndex;
	var currentUncheckedVols = [];
	var currentCheckedVols = [[],[]];
	function getItems () {

		//	Hide shift selector when there's only one shift for the current day

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
			$scope.multiShift = true;
		}
	}

	$scope.hide = "";
	$scope.removeItems = function () { 
		for(var i = $scope.uncheckedVolunteers.length -1; i >= 0; i--){ //Traversing backwards to preserve indices of yet-to-be-reoved items
			if($scope.uncheckedVolunteers[i].selected){
				$scope.uncheckedVolunteers[i].deleted = true;
				var removed = $scope.uncheckedVolunteers.splice(i, 1);
				$scope.checkedVolunteers.push(removed[0]);
			}
		}
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
					}
				}
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


