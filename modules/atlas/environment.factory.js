(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('environment', environmentFactory);

    environmentFactory.$inject = ['$location'];

    function environmentFactory ($location) {
        var variables,
            environment;

        variables = {
            DEVELOPMENT: {
                API_ROOT: 'https://api-acc.datapunt.amsterdam.nl/'
            },
            PRODUCTION: {
                API_ROOT: 'https://api.datapunt.amsterdam.nl/'
            }
        };

        switch ($location.host()) {
            case 'atlas.amsterdam.nl':
                environment = 'PRODUCTION';
                break;

            default:
                environment = 'DEVELOPMENT';
        }

        return variables[environment];
    }
})();