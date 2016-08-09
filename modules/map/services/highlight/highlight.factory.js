(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('highlight', highlightFactory);

    highlightFactory.$inject = [
        'L',
        'crsService',
        'ICON_CONFIG',
        'angleConversion',
        'geojson',
        'crsConverter',
        'mapConfig',
        'store',
        'ACTIONS'
    ];

    function highlightFactory (
        L,
        crsService,
        ICON_CONFIG,
        angleConversion,
        geojson,
        crsConverter,
        mapConfig,
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
            var layer,
                bounds,
                location,
                zoomLevel;

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
                bounds = layer.getBounds();
                zoomLevel = leafletMap.getBoundsZoom(bounds);

                if (!isNaN(zoomLevel)) {
                    //A valid zoom level has been determined
                    leafletMap.fitBounds(bounds, {
                        animate: false
                    });
                } else {
                    //Set the location and zoomLevel manually
                    location = crsConverter.rdToWgs84(geojson.getCenter(item.geometry));
                    zoomLevel = mapConfig.DEFAULT_ZOOM_HIGHLIGHT;

                    store.dispatch({
                        type: ACTIONS.MAP_ZOOM,
                        payload: {
                            viewCenter: location,
                            zoom: zoomLevel
                        }
                    });
                }
            }

            layer.addTo(leafletMap);
        }

        function remove (leafletMap, item) {
            leafletMap.removeLayer(layers[item.id]);
        }
    }
})();