(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('mapConfig', mapConfigFactory);

    mapConfigFactory.$inject = ['environment'];

    function mapConfigFactory (environment) {
        var globalConfig,
            environmentConfig;

        globalConfig = {
            AMSTERDAM_BOUNDS: [
                [52.269470, 4.743862], //south west
                [52.427077, 5.047359] //north east
            ]
        };

        environmentConfig = {
            DEVELOPMENT: {
                MAP_ROOT: 'https://map-acc.datapunt.amsterdam.nl',
                TILE_DOMAINS: ['t1-acc', 't2-acc', 't3-acc', 't4-acc']
            },
            PRODUCTION: {
                MAP_ROOT: 'https://map.datapunt.amsterdam.nl',
                TILE_DOMAINS: ['t1', 't2', 't3', 't4']
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();
