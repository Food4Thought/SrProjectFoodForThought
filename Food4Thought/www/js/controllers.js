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
	//User is in list of users. Set them as active user and navigate to home page

	//look for $scope.userData.email in $scope.$storage.users

.controller('HomeCtrl', function($scope, $ionicModal) {
	$scope.shifts = [];


	var shift1 = {loc: 'MSU', date: '12/5/12', organization: 'Food4Thought', time: '7:30-9:30am', location: 'The Regency Athletic Complex at MSU Denver.', address: '1390 Shoshone St, Denver, CO 80204'};

	var shift2 = {loc: 'Ellis', date: '3/3/17', organization: 'Food4Thought', time: '2-3:30pm', location: 'Ellis Elementary School.', address: '1651 S Dahlia St, Denver, CO 80222'};

	$scope.clothInfo = "Please wear comforable clothing and dress for working in an outdoor covered location.";

	$scope.createShift = function(shift) {
		$scope.shifts.push({
			loc: shift.loc,
			date: shift.date,
			organization: shift.organization,
			time: shift.time,
			location: shift.location,
			address: shift.address,
			info2: $scope.clothInfo
		}); 
	};

	$scope.createShift(shift1);
	$scope.createShift(shift2);

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

	$scope.launchMaps = function(address){
		if(ionic.Platform.isIOS()){
			window.location.href = "maps://maps.apple.com/?daddr=" + address;
		}
		else if(ionic.Platform.isAndroid()){
			window.location.href = "geo:?q=" + address;
		}
		else{
			window.location.href = "https://www.google.com/maps/place/" + address;	
		}
	};

	function pickNewShiftModal () {
		if(ionic.Platform.isIOS()){
			return ('/templates/newShiftModals/ios.html');
		}
		else if(ionic.Platform.isAndroid()){
			return ('/templates/newShiftModals/android.html');
		}
		else {
			return ('/templates/newShiftModals/web.html');
		}
	}

	// Sign Up Modal
	$ionicModal.fromTemplateUrl(pickNewShiftModal(), {
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
	$ionicModal.fromTemplateUrl('templates/admin/urgent-dialog.html', function(modal) {
		$scope.addUrgentDialog = modal;
	},  {
		scope: $scope,
		animation: 'slide-in-up'
	});
	$ionicModal.fromTemplateUrl('templates/admin/info-dialog.html', function(modal) {
		$scope.addInfoDialog = modal;
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

	$scope.leaveAddChangeUrgent = function() {
		// remove dialog
		$scope.addUrgentDialog.remove();
		// reload modal template to have cleared form
		$ionicModal.fromTemplateUrl('templates/admin/urgent-dialog.html', function(modal) {
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
		$ionicModal.fromTemplateUrl('templates/admin/info-dialog.html', function(modal) {
			$scope.addInfoDialog = modal;
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
	};
	$scope.removeInfo = function(item) {
		// search & destroy item from list
		$scope.info.splice($scope.info.indexOf(item), 1);
		// if this item was the default we set first item in list to default
		// save list in factory
		InfoFactory.setList($scope.info);
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

	/*	$scope.notificationsUrgent = [
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
		};*/
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


