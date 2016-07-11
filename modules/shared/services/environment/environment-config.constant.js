(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('ENVIRONMENT_CONFIG', {
            DEVELOPMENT: {
                API_ROOT: 'https://api-acc.datapunt.amsterdam.nl/',
                PANO_VIEW_PROXY: 'https://map-acc.datapunt.amsterdam.nl/earthmine/get_views.php'
            },
            PRODUCTION: {
                API_ROOT: 'https://api.datapunt.amsterdam.nl/',
                PANO_VIEW_PROXY: 'https://map.datapunt.amsterdam.nl/earthmine/get_views.php'
            }
        });
})();