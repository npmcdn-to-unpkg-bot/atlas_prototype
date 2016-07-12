(function () {
  'use strict';

  angular
    .module('dpShared')
    .factory('wgs84RdConverter', wgs84RdConverterFactory);

  wgs84RdConverterFactory.$inject = ['CRS_CONFIG', 'proj4'];

  function wgs84RdConverterFactory (CRS_CONFIG, proj4) {


    return{
      wgs84ToRd: wgs84ToRd,
      rdToWgs84: rdToWgs84
    };

    /*
     * @params {Object or Array} wgs84 - An object with this structure: {x:x,y:y} or [x,y]
     *
     * @returns {Object or Array} - RD - An object with this structure: {x:x,y:y} or [x,y] same as input
     */
    function wgs84ToRd(coordinates){
      return proj4(CRS_CONFIG.WGS84.projection, CRS_CONFIG.RD.projection, coordinates);
    }

    /*
     * @params {Object or Array} RD - An object with this structure: {x:x,y:y} or [x,y]
     *
     * @returns {Object or Array} wgs84 - An object with this structure: {x:x,y:y} or [x,y] same as input
     */
    function rdToWgs84(coordinates){
      return proj4(CRS_CONFIG.RD.projection, CRS_CONFIG.WGS84.projection, coordinates);
    }
  }
})();
