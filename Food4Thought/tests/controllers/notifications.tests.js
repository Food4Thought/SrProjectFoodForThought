describe('NotificationsCtrl', function() {
	var scope;

	//load the controller's module
	beforeEach(module('starter.controllers'));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller('NotificationsCtrl', {$scope: scope});
	}));

	it('should have notificationsUrgent to be', function() {
		expect(scope.notificationsUrgent).toContain({title: 'blah'});
	}); 
	it('should add urgent notification', function() {
		var okok = {title: 'okok'};
		scope.createUrgent(okok);
		expect(scope.notificationsUrgent).toContain({title: 'okok'});
	}); 
	it('should have preexisting notificationsInfo', function() {
		expect(scope.notificationsInfo).toContain({title: 'something cool and informative, yay kids!'});
	}); 
	it('should add info notification', function() {
		var toAdd = {title: 'new'};
		scope.createInfo(toAdd);
		expect(scope.notificationsInfo).toContain({title: 'new'});
	}); 
});
