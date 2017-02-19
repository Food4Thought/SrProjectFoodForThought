// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

		// setup an abstract state for the tabs directive
		.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'templates/tabs.html'
		})  

	// Each tab has its own nav history stack:

	.state('tab.home', {
		url: '/home',
		views: {
			'tab-home': {
				templateUrl: 'templates/tab-home.html',
				controller: 'HomeCtrl'
			}   
		}   
	})  

	.state('tab.notifications', {
		url: '/notifications',
		views: {
			'tab-notifications': {
				templateUrl: 'templates/tab-notifications.html',
				controller: 'NotificationsCtrl'
			}
		}
	})

	.state('tab.settings', {
		url: '/settings',
		views: {
			'tab-settings': {
				templateUrl: 'templates/tab-settings.html',
				controller: 'SettingsCtrl'
			}
		}
	})

	.state('tab.admin', {
		url: '/admin',
		views: {
			'tab-admin': {
				templateUrl: 'templates/tab-admin.html',
				controller: 'AdminCtrl'
			}   
		}   

	}) 

	.state("tab.admin-checkin", {
		url:"/admin/checkin",
		views:{
			'tab-admin':{
				templateUrl: 'templates/admin-checkin.html'
			}
		}
	})

	.state("tab.admin-notifications", {
		url:"/admin/notifications",
		views:{
			'tab-admin':{
				templateUrl: 'templates/admin-notifications.html',
				controller: 'Admin-NotCtrl'
			}
		}
	})

	.state("tab.admin-locations", {
		url:"/admin/locations",
		views:{
			'tab-admin':{
				templateUrl: 'templates/admin-locations.html'
			}
		}
	})

	.state("tab.admin-times", {
		url:"/admin/times",
		views:{
			'tab-admin':{
				templateUrl: 'templates/admin-times.html'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/home');
});
