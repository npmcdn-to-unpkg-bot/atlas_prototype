(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('mapConfig', mapConfigFactory);

    mapConfigFactory.$inject = ['environment', 'crsService'];

    function mapConfigFactory (environment, crsService) {
        var globalConfig,
            environmentConfig;

        globalConfig = {
            BASE_LAYER_OPTIONS: {
                minZoom: 8,
                maxZoom: 16,
                tms: true
            },
            MAP_OPTIONS: {
                crs: crsService.getRd(),
                maxBounds: [
                    [52.269470, 4.743862], //south west
                    [52.427077, 5.047359] //north east
                ],
                attributionControl: false,
                zoomControl: false
            },
            OVERLAY_OPTIONS: {
                identify: false,
                format: 'image/png',
                transparent: true
            },
            SCALE_OPTIONS: {
                metric: true,
                imperial: false
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
