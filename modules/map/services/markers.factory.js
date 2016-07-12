(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('markers', markersFactory);

    markersFactory.$inject = ['$rootScope'];

    function markersFactory ($rootScope) {
        return {
            initialize: initialize
        };

        function initialize (leafletMap, markers) {
            //console.log(markers);

            /*
            $rootScope.$watch(markers, function (newMarkers, oldMarkers) {
                //console.log(newMarkers);
            });
            */
        }
    }
})();