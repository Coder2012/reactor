'use strict';

angular.module('reactorApp')
  .controller('MainCtrl', function ($scope, $http, socket, FlightService) {
    $scope.flights = [1,2,3,4];
    $scope.pilots = [1,2,3];
    $scope.selectedLimit = 5;
    $scope.flightsLimitTo = $scope.selectedLimit;

    FlightService.getPilots().then(function(response){
      // console.log("response: ", response.data);
      $scope.pilots = response.data.sort();
    });

    FlightService.getClubs().then(function(response){
      // console.log("response: ", response.data);
      $scope.clubs = response.data.sort();
    });

    FlightService.getTypes().then(function(response){
      // console.log("response: ", response.data);
      $scope.types = response.data.sort();
    });

    FlightService.getSites().then(function(response){
      // console.log("response: ", response.data);
      $scope.sites = response.data.sort();
    });

    $scope.updateResultsByPilot = function(pilot){
      FlightService.getFlightsByPilot(pilot).then(function(response){
        _.forEach(response.data, function(item, index){
          updateItem(item);
        });
        $scope.flights = response.data;
      });
    };

    $scope.updateResultsByClub = function(club){
      FlightService.getFlightsByClub(club).then(function(response){
        _.forEach(response.data, function(item, index){
          updateItem(item);
        });
        $scope.flights = response.data;
      });
    };

    $scope.updateResultsByType = function(type){
      FlightService.getFlightsByType(type).then(function(response){
        _.forEach(response.data, function(item){
          updateItem(item);
        });
        $scope.flights = response.data;
      });
    };

    $scope.updateResultsBySite = function(site){
      FlightService.getFlightsBySite(site).then(function(response){
        _.forEach(response.data, function(item){
          updateItem(item);
        });
        $scope.flights = response.data;
      });
    };

    function updateItem(item) {
      var d = item.date;
      item.date = moment(Number(d)).format('Do MMMM YYYY');
    };

    $scope.showMore = function() {
      $scope.flightsLimitTo += Number($scope.selectedLimit);
    };

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
