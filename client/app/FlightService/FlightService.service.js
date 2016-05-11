'use strict';

angular.module('reactorApp')
  .factory('FlightService', function ($http) {

    // Public API here
    return {

      getPilots: function() {
        var promise = $http.get('/api/flights/pilots').success(function() {
          console.log('success retrieving pilots');
        }).error(function(){
          console.log('getPilots error retrieving pilots');
        });
        return promise;
      },

      getClubs: function() {
        var promise = $http.get('/api/flights/clubs').success(function() {
          console.log('success retrieving clubs');
        }).error(function(){
          console.log('getClubs error retrieving clubs');
        });
        return promise;
      },

      getTypes: function() {
        var promise = $http.get('/api/flights/types').success(function() {
          console.log('success retrieving types');
        }).error(function(){
          console.log('getTypes error retrieving types');
        });
        return promise;
      },

      getSites: function() {
        var promise = $http.get('/api/flights/sites').success(function() {
          console.log('success retrieving sites');
        }).error(function(){
          console.log('getSites error retrieving sites');
        });
        return promise;
      },

      getFlightsByPilot: function (pilot) {
        var promise = $http.get('/api/flights/pilot/' + pilot).success(function() {
          console.log('success retrieving flights');
        }).error(function(){
          console.log('getFlightsByPilot error retrieving flights for - ', pilot);
        });
        return promise;
      },

      getFlightsByClub: function (club) {
        var promise = $http.get('/api/flights/club/' + club).success(function() {
          console.log('success retrieving flights');
        }).error(function(){
          console.log('getFlightsByClub error retrieving flights for - ', club);
        });
        return promise;
      },

      getFlightsByType: function (type) {
        var promise = $http.get('/api/flights/type/' + type).success(function() {
          console.log('success retrieving flights');
        }).error(function(){
          console.log('getFlightsByType error retrieving flights for - ', type);
        });
        return promise;
      },

      getFlightsBySite: function (site) {
        var promise = $http.get('/api/flights/site/' + site).success(function() {
          console.log('success retrieving flights');
        }).error(function(){
          console.log('getFlightsBySite error retrieving flights for - ', site);
        });
        return promise;
      },

      getFlightsByDate: function (date) {
        var promise = $http.get('/api/flights/date/' + date).success(function() {
          console.log('success retrieving flights');
        }).error(function(){
          console.log('getFlightsByDate error retrieving flights for - ', date);
        });
        return promise;
      },

      getFlightsCount: function () {
        var promise = $http.get('/api/flights/flightsCount').success(function() {
          console.log('success retrieving flights');
        }).error(function(){
          console.log('getFlightsCount error retrieving flights count');
        });
        return promise;
      },

      getFlightsByDateCount: function (date) {
        var promise = $http.get('/api/flights/flightsByDateCount/' + date).success(function() {
          console.log('success retrieving flights');
        }).error(function(){
          console.log('getFlightsCount error retrieving flights count');
        });
        return promise;
      }

    };
  });
