/* globals Redux, L, proj4 */

(function () {
    'use strict';

    angular
        .module('dpShared')
        .config(configuration);

    configuration.$inject = ['$provide'];

    function configuration ($provide) {
        $provide.constant('Redux', Redux);
        $provide.constant('L', L);
        $provide.constant('proj4', proj4);
    }
})();