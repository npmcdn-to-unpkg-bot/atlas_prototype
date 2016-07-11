/* globals d3, BBGA */

(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .config(configuration);

    configuration.$inject = ['$provide'];

    function configuration ($provide) {
        $provide.constant('d3', d3);
        $provide.constant('BBGA', BBGA);
    }
})();