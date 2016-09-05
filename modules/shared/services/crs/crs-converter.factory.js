(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('crsConverter', crsConverterFactory);

    crsConverterFactory.$inject = ['CRS_CONFIG', 'proj4'];

    function crsConverterFactory (CRS_CONFIG, proj4) {
        return{
            wgs84ToRd: wgs84ToRd,
            rdToWgs84: rdToWgs84
        };

        /*
         * @params {Array} wgs84 - An array with this structure: [lat, lon]
         * let op x is lon (4.xxx) en y is lat (52.xxx)
         *
         * @returns {Array} - RD - An array with this structure: [x, y]
         */
        function wgs84ToRd (wgs84Coordinates){
            var rd = proj4(CRS_CONFIG.RD.projection, angular.copy(wgs84Coordinates).reverse());

            return [rd[0].toFixed(2), rd[1].toFixed(2)];
        }

        /*
         * @params {Array} RD - An array with this structure: [x, y]
         *
         * @returns {Array} wgs84 - An An array with this structure: [lat, lon]
         */
        function rdToWgs84 (rdCoordinates){
            var wgs84 = proj4(CRS_CONFIG.RD.projection, CRS_CONFIG.WGS84.projection, rdCoordinates).reverse();

            return [wgs84[0].toFixed(7), wgs84[1].toFixed(7)];
        }
    }
})();
