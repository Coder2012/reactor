'use strict';

angular.module('reactorApp')
  .controller('MainCtrl', function ($scope, $http, socket, FlightService) {
    $scope.flights = [1,2,3,4];
    $scope.pilots = [1,2,3];
    $scope.activeQuery = {};

    var count = 1;

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

    $scope.reset = function(){
      $scope.activeQuery = {};
      count = 1;
    };

    $scope.getFlightsByPilot = function(pilot){
      console.log('pilot: ', pilot);
    };

    $scope.updateResultsByPilot = function(pilot, page, limit){
      var page = (isNaN(page)) ? 1 : page;

      FlightService.getFlightsByPilot(pilot, page, limit).then(function(response){
        $scope.activeQuery.pilot = pilot;
        $scope.activeQuery.page = page;
        $scope.activeQuery.limit = limit;

        _.forEach(response.data, function(item, index){
          item.count = index + count;
          var d = item.date;
          item.date = moment(Number(d)).format('Do MMMM YYYY');
        });

        count += response.data.length;

        $scope.flights = response.data;
      });
    };

    $scope.updateResultsByPilotNext = function(){
      $scope.updateResultsByPilot($scope.activeQuery.pilot, ++ $scope.activeQuery.page, $scope.activeQuery.limit);
    };

    $scope.updateResultsByClub = function(club, page, limit){
      var page = (isNaN(page)) ? 1 : page;


      FlightService.getFlightsByClub(club, page, limit).then(function(response){
        $scope.activeQuery.club = club;
        $scope.activeQuery.page = page;
        $scope.activeQuery.limit = limit;

        _.forEach(response.data, function(item, index){
          item.count = index + count;
          var d = item.date;
          item.date = moment(Number(d)).format('Do MMMM YYYY');
        });
        $scope.flights = response.data;
      });
    };

    $scope.updateResultsByClubNext = function(){
      $scope.updateResultsByClub($scope.activeQuery.club, ++ $scope.activeQuery.page, $scope.activeQuery.limit);
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
