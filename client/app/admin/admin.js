'use strict';

angular.module('reactorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      }).state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/admin/dashboard.html',
        controller: 'AdminCtrl'
      });
  });