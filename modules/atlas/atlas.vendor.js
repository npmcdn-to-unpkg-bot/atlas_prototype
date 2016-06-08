/* globals Redux */

(function () {
    'use strict';

    angular
        .module('atlas')
        .config(configuration);

    configuration.$inject = ['$provide'];

    function configuration ($provide) {
        $provide.constant('Redux', Redux);
    }
})();