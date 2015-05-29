'use strict';

angular.module('reactorApp')
  .controller('MainCtrl', function ($scope, $http, socket, FlightService) {
    $scope.flights = [1,2,3,4];
    $scope.pilots = [1,2,3];
    // $scope.awesomeThings = [];

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

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

    $scope.getFlightsByPilot = function(pilot){
      console.log('pilot: ', pilot);
    };

    $scope.updateResultsByPilot = function(pilot){
      FlightService.getFlightsByPilot(pilot).then(function(response){
        _.forEach(response.data, function(item){
          var d = item.date;
          item.date = moment(Number(d)).format('Do MMMM YYYY');
        });
        $scope.flights = response.data;
      });
    };

    $scope.updateResultsByClub = function(club){
      FlightService.getFlightsByClub(club).then(function(response){
        _.forEach(response.data, function(item){
          var d = item.date;
          item.date = moment(Number(d)).format('Do MMMM YYYY');
        });
        $scope.flights = response.data;
      });
    };

    $scope.updateResultsByType = function(type){
      FlightService.getFlightsByType(type).then(function(response){
        _.forEach(response.data, function(item){
          var d = item.date;
          item.date = moment(Number(d)).format('Do MMMM YYYY');
        });
        $scope.flights = response.data;
      });
    };

    $scope.updateResultsBySite = function(site){
      FlightService.getFlightsBySite(site).then(function(response){
        _.forEach(response.data, function(item){
          var d = item.date;
          item.date = moment(Number(d)).format('Do MMMM YYYY');
        });
        console.log("data: ", response.data.length);
        $scope.flights = response.data;
      });
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
