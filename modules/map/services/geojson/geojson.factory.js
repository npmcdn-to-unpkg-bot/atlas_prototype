(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('geojson', geojsonFactory);

    geojsonFactory.$inject = ['L', 'crsService'];

    function geojsonFactory (L, crsService) {
        var markers = {},
            layers = {};

        return {
            initialize: initialize,
            add: add,
            remove: remove
        };

        function initialize (leafletMap) {
            L.Icon.Default.imagePath = 'assets';
        }

        function add (leafletMap, geoJSON) {
            if (geoJSON.geometry.type === 'Point') {
                addMarker(leafletMap, geoJSON);
            } else if (geoJSON.geometry.type === 'MultiPolygon') {
                addMultiPolygon(leafletMap, geoJSON);
            }
        }

        function remove (leafletMap, id) {
            console.log('remove', id);
            leafletMap.removeLayer(layers[id]);
        }

        function addMarker (leafletMap, marker) {
            console.log('addMarker', leafletMap, marker);
        }

        function addMultiPolygon (leafletMap, geoJSON) {
            var layer;

            geoJSON.geometry.crs = crsService.getRdObject();

            layer = L.Proj.geoJson(geoJSON.geometry, {
                style: function () {
                    return {
                        color: 'red',
                        fillColor: 'red',
                        weight: 2,
                        opacity: 1.6,
                        fillOpacity: 0.2
                    };
                }
            });

            layers[geoJSON.id] = layer;

            leafletMap.addLayer(layer);
        }
        /*
        function removeMarker (leafletMap, markerId) {
            console.log('removeMarker', leafletMap, markerId);
        }
        */
    }
})();