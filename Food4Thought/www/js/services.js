angular.module('starter.services', [])
.factory('UrgentFactory', function() {

	var urgentNotifications = [];
	var urgentStore = localStorage.getItem("urgentNotifications");
	if (urgentStore != null && urgentStore != '' && angular.isArray(angular.fromJson(urgentStore))) {
		urgentNotifications = angular.fromJson(urgentStore);
	}
	var urgentSrv = {
		setList: function(newList) {
			urgentNotifications = newList;
			localStorage.setItem("urgentNotifications", angular.toJson(urgentNotifications));
			return true;
		},
		getList: function() {
			if (urgentNotifications != null) {
				return urgentNotifications;
			} else {
				return [];
			}
		}
	};
	return urgentSrv;
})

.factory('InfoFactory', function() {
	var infoNotifications = [];
	var infoStore = localStorage.getItem("infoNotifications");
	if(infoStore != null && infoStore != '' && angular.isArray(angular.fromJson(infoStore))) {
		infoNotifications = angular.fromJson(infoStore);
	}
	var infoSrv = {
		setList: function(newList) {
			infoNotifications = newList;
			localStorage.setItem("infoNotifications", angular.toJson(infoNotifications));
			return true;
		},
		getList: function() {
			if(infoNotifications != null) {
				return infoNotifications;
			} else {
				return [];
			}
		}
	};
	return infoSrv;
})

.factory('ShiftFactory', function() {

	var shifts = [];
	var shiftStore = localStorage.getItem("shifts");
	if(shiftStore != null && shiftStore != '' && angular.isArray(angular.fromJson(shiftStore))) {
		shifts = angular.fromJson(shiftStore);
	}
	var shiftSrv = {
		setList: function(newList) {
			shifts = newList;
			localStorage.setItem("shifts", angular.toJson(shifts));
			return true;
		},
		getList: function() {
			if(shifts != null) {
				return shifts;
			} else {
				return [];
			}
		}
	};
	return shiftSrv;
})

.factory('LocFactory', function() {

	var locations = [];
	var locStore = localStorage.getItem("locations");
	if(locStore != null && locStore != '' && angular.isArray(angular.fromJson(locStore))) {
		locations = angular.fromJson(locStore);
	}
	var locSrv = {
		setList: function(newList) {
			locations = newList;
			localStorage.setItem("locations", angular.toJson(locations));
			return true;
		},
		getList: function() {
			if(locations != null) {
				return locations;
			} else {
				return [];
			}
		}
	};
	return locSrv;
});
