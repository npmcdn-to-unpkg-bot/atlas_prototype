(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('sharedConfig', sharedConfigFactory);

    sharedConfigFactory.$inject = ['environment'];

    function sharedConfigFactory (environment) {
        var globalConfig,
            environmentConfig;

        globalConfig = {};

        environmentConfig = {
            DEVELOPMENT: {
                STRAATBEELD_THUMB_URL: 'https://map-acc.datapunt.amsterdam.nl/earthmine/get_views.php'
            },
            PRODUCTION: {
                STRAATBEELD_THUMB_URL: 'https://map.datapunt.amsterdam.nl/earthmine/get_views.php'
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();