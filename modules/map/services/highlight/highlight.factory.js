(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('highlight', highlightFactory);

    highlightFactory.$inject = [
        '$timeout',
        'L',
        'crsService',
        'ICON_CONFIG',
        'angleConversion',
        'mapConfig',
        'crsConverter',
        'geojson',
        'store',
        'ACTIONS'
    ];

    function highlightFactory (
        $timeout,
        L,
        crsService,
        ICON_CONFIG,
        angleConversion,
        mapConfig,
        crsConverter,
        geojson,
        store,
        ACTIONS) {

        var layers = {};

        return {
            initialize: initialize,
            add: add,
            remove: remove
        };

        function initialize () {
            L.Icon.Default.imagePath = 'assets';
        }

        /**
         * @param {Object} leafletMap - A Leaflet map instance
         * @param {Object} item - An object with the following properties:
         *  - id: in case of a marker this needs to be a mapping to a key of ICON_CONFIG
         *  - geometry: GeoJSON using RD coordinates
         */
        function add (leafletMap, item) {
            var layer;
window.leafletMap = leafletMap;
            item.geometry.crs = crsService.getRdObject();

            layer = L.Proj.geoJson(item.geometry, {
                style: function () {
                    return {
                        color: 'red',
                        fillColor: 'red',
                        weight: 2,
                        opacity: 1.6,
                        fillOpacity: 0.2
                    };
                },
                pointToLayer: function (feature, latLng) {
                    var icon,
                        rotationAngle;

                    icon = L.icon(ICON_CONFIG[item.id]);
                    rotationAngle = item.orientation || 0;

                    return L.marker(latLng, {
                        icon: icon,
                        rotationAngle: angleConversion.radiansToDegrees(rotationAngle)
                    });
                }
            });

            layers[item.id] = layer;

            if (item.useAutoZoom) {
                console.log('useAutoZoom');
                $timeout(function () {
                    var bounds,
                        boundsZoom;

                    bounds = layer.getBounds();
                    boundsZoom = leafletMap.getBoundsZoom(bounds);
                    console.log('boundsZoom', boundsZoom);
                    leafletMap.fitBounds(bounds, {
                        animate: false
                    });

                    if (isNaN(boundsZoom)) {
                        leafletMap.setZoom(mapConfig.DEFAULT_ZOOM_HIGHLIGHT);
                    }
                });
            }

            layer.addTo(leafletMap);
        }

        function remove (leafletMap, item) {
            leafletMap.removeLayer(layers[item.id]);
        }
    }
})();