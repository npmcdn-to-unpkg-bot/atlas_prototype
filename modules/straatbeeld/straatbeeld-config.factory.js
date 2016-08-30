(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('straatbeeldConfig', straatbeeldConfigFactory);

    straatbeeldConfigFactory.$inject = ['environment'];

    function straatbeeldConfigFactory (environment) {
        var globalConfig,
            environmentConfig;

        globalConfig = {
            DEFAULT_FOV: 80,
            MAX_FOV: 120,
            MAX_RESOLUTION: 16 * 1024,
            HOTSPOT_PERSPECTIVE: {
                perspective: {
                    radius: 750,
                    extraRotations: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                }
            }
        };

        environmentConfig = {
            DEVELOPMENT: {
                DATA_ENDPOINT: 'https://map-acc.datapunt.amsterdam.nl/earthmine/get_panos.php',
                TILE_ENDPOINT: 'https://map-acc.datapunt.amsterdam.nl/earthmine/tile_proxy.php',
                NEW_DATA_ENDPOINT: 'https://api-acc.datapunt.amsterdam.nl/panorama/opnamelocatie/'
            },
            PRODUCTION: {
                DATA_ENDPOINT: 'https://map.datapunt.amsterdam.nl/earthmine/get_panos.php',
                TILE_ENDPOINT: 'https://map.datapunt.amsterdam.nl/earthmine/tile_proxy.php'
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();
