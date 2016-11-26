angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //Here is the stuff to start our shift
  $scope.startData = {};

  $ionicModal.fromTemplateUrl('templates/start.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeStart = function() {
    $scope.modal.hide();
  };

  $scope.start = function() {
    $scope.modal.show();
  };

  $scope.doStart = function() {
    console.log('Starting Shift', $scope.startData);

    //get time and send to server
    $timeout(function() {
      $scope.closeStart();
    }, 1000);
  };
})

.controller('ButtonCtrl', function($scope, $location) {
  $scope.goTourl = function(path) {
    $location.path(path);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
