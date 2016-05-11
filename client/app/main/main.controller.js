'use strict';

angular.module('reactorApp')
  .controller('MainCtrl', function ($scope, $http, FlightService) {
    $scope.flights = [];
    $scope.pilots = [];
    $scope.selectedLimit = 5;
    $scope.flightsLimitTo = $scope.selectedLimit;
    $scope.selectedDate = new Date();

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

    $scope.updateResultsByDate = function(site){
      FlightService.getFlightsByDate($scope.selectedDate).then(function(response){
        _.forEach(response.data, function(item, index){
          updateItem(item);
        });
        $scope.flights = response.data;
      })
    };

    $scope.reset = function() {
      console.log("reset");
    }

    function updateItem(item) {
      var d = item.date;
      item.date = moment(Number(d)).format('Do MMMM YYYY');
    };

    $scope.showMore = function() {
      $scope.flightsLimitTo += Number($scope.selectedLimit);
    };

  });
