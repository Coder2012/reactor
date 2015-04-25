'use strict';

angular.module('reactorApp')
  .factory('FlightService', function ($http) {

    // Public API here
    return {

      getPilots: function() {
        var promise = $http.get('/api/flights/pilots').success(function(response) {
          console.log("success retrieving pilots");
        }).error(function(){
          console.log("getPilots error retrieving pilots");
        });
        return promise;
      },

      getFlightsByPilot: function (pilot) {
        var promise = $http.get('/api/flights/pilot/' + pilot).success(function(flights) {
          console.log('success retrieving flights');
        }).error(function(){
          console.log('getFlightsByPilot error retrieving flights for - ', pilot);
        });
        return promise;
      }
    };
  });
