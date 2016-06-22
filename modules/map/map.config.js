(function () {
    'use strict';

    angular
        .module('dpMap')
        .config(configuration);

    configuration.$inject = ['$provide'];

    function configuration ($provide) {
        $provide.constant('MAP_CONFIG', {
            AMSTERDAM_BOUNDS: [
                [52.269470, 4.743862], //south west
                [52.427077, 5.047359] //north east
            ]
        });
    }
})();
