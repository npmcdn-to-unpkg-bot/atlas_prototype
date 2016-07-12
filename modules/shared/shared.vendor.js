/* globals Redux, L */

(function () {
    'use strict';

    angular
        .module('dpShared')
        .config(configuration);

    configuration.$inject = ['$provide'];

    function configuration ($provide) {
        $provide.constant('Redux', Redux);
        $provide.constant('L', L);
    }
})();