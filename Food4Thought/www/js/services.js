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
});
