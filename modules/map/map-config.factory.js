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
            ],
            BASE_LAYER_OPTIONS: {
                minZoom: 8,
                maxZoom: 16,
                tms: true
            },
            OVERLAY_OPTIONS: {
                identify: false,
                format: 'image/png',
                transparent: true
            }
        };

        environmentConfig = {
            DEVELOPMENT: {
                BASE_LAYER_OPTIONS: {
                    subdomains: ['t1-acc', 't2-acc', 't3-acc', 't4-acc']
                },
                OVERLAY_ROOT: 'https://map-acc.datapunt.amsterdam.nl/'
            },
            PRODUCTION: {
                BASE_LAYER_OPTIONS: {
                    subdomains: ['t1', 't2', 't3', 't4']
                },
                OVERLAY_ROOT: 'https://map.datapunt.amsterdam.nl/'
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();
