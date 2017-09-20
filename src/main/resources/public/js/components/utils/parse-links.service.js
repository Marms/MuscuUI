'use strict';

angular.module('DashboardWM')
    .service('ParseLinks', function () {
        this.parse = function (data) {
        	var links = {};
        	links.first = true;
            if (!data.last) {
            	links.next = true;
            	links.suivant = data.number + 2;
            }
            if (!data.first) {
            	links.prev = true;
            	links.precedent = data.number - 1;
            }
            links.last = data.totalPages;
            
            return links;
        }
    });
