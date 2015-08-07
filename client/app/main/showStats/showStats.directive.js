'use strict';

angular.module('reactorApp')
  .directive('showStats', function () {
    return {
      restrict: 'A',
      scope: {
      	showStats: '=active'
      },
      link: function (scope, element, attrs) {
        element.on('click', function(){
        	var stats = element.closest('div').find('.flight__stats');
        	stats.toggleClass('active');
        	if(stats.hasClass('active')){
        		element.find('span').text('Hide stats');
        	}else{
        		element.find('span').text('Show stats');
        	}
        });
      }
    };
  });