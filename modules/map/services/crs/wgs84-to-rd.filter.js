(function () {
  'use strict';

  angular
    .module('dpMap')
    .filter('wgs84ToRd', wgs84ToRdFilter);

  wgs84ToRdFilter.$inject = ['crsService'];

  function wgs84ToRdFilter (crsService) {
    /*
     * @params {Object} wgs84 - An object with this structure: {latitude: 53.123, longitude: 4.789}
     *
     * @returns {String} - A formatted text with the RD coordinates
     */
    return function (wgs84) {
      var rdProjection;

      rdProjection = crsService.getRd().project({
        lat: wgs84.latitude,
        lng: wgs84.longitude
      });

      return Math.round(rdProjection.x) + ', ' + Math.round(rdProjection.y);
    };
  }
})();
