angular.module('starter.services', [])
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


