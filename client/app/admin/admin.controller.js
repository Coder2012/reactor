'use strict';

angular.module('reactorApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, FlightService) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    FlightService.getFlightsCount().then(function(response){
      $scope.flightsCount = response.data;
    });

    FlightService.getFlightsByDateCount('01:08:2015').then(function(response){
      $scope.flightsByDateCount = response.data;
    });

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
