(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('markers', markersFactory);

    markersFactory.$inject = [];

    function markersFactory () {
        //var markers = {};

        return {
            addMarker: addMarker,
            removeMarker: removeMarker
        };

        function addMarker (leafletMap, marker) {
            console.log('add', marker);
        }

        function removeMarker (leafletMap, markerId) {
            console.log('remove', markerId);

        }
    }
})();