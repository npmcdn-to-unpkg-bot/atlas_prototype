(function(){
    'use strict';

    angular
        .module('dpShared')
        .service('crsService', crsService);

    crsService.$inject = ['L', 'CRS_CONFIG'];

    function crsService (L, CRS_CONFIG) {
        var rd,
            wgs84;

        activate();

        return {
            getRd: getRd,
            getWGS84: getWGS84,
            getRdObject: getRdObject
        };

        function activate () {
            var rdSettings,
            wgs84Settings;

            rdSettings = angular.copy(CRS_CONFIG.RD);
            wgs84Settings = angular.copy(CRS_CONFIG.WGS84);

            /*
             * Convert the Array syntax from the configuration to the L.bounds format
             * http://leafletjs.com/reference.html#bounds
             */
            rdSettings.transformation.bounds = L.bounds.apply(null, rdSettings.transformation.bounds);

            rd = new L.Proj.CRS(
                rdSettings.code,
                rdSettings.projection,
                rdSettings.transformation
            );

            /*
             * Door bug in Leaflet werkt de schaalbalk niet met de standaard RD instellingen er worden
             * voor een workaround hier 2 waarden toegevoegd. initiatie schaal in zoom.directive.js
             * https://github.com/Leaflet/Leaflet/issues/4091
             */
            rd.distance = L.CRS.Earth.distance;
            rd.R = CRS_CONFIG.EARTH_RADIUS;

            wgs84 = new L.Proj.CRS(
                wgs84Settings.code
            );
        }

        function getRd () {
            return rd;
        }

        function getWGS84 () {
            return wgs84;
        }

        /*
         * @returns {Object} - An object used to identify the CRS of a GeoJSON object:
         * http://geojson.org/geojson-spec.html#coordinate-reference-system-objects
         */
        function getRdObject () {
            return {
                type: 'name',
                properties: {
                    name: CRS_CONFIG.RD.code
                }
            };
        }
    }
})();
