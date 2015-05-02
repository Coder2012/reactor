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
      $scope.pilots = response.data;
    });

    $scope.getFlightsByPilot = function(pilot){
      console.log('pilot: ', pilot);
    };

    $scope.updateResults = function(pilot){
      FlightService.getFlightsByPilot(pilot).then(function(response){
        _.forEach(response.data, function(item){
          var d = item.date;
          item.date = moment(Number(d)).format('Do MMMM YYYY');
        });
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
