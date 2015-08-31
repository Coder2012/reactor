'use strict';

angular.module('reactorApp')
  .directive('searchFilters', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
      	console.log("filters");
        var items = element.find('[data-filter-item]');
        
        items.each(function(index, item){
        	var button = $(item).find('[data-filter-link]');
        	button.on('click', function(){
        		handleClick(button);
        	});
        });

        function handleClick(button){
        	items.each(function(index, item){
        		var item = $(item);
        		item.removeClass('active');
            button.parent().addClass('active');
        	});
        }
      }
    };
  });