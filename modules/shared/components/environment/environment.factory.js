(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('environment', environmentFactory);

    environmentFactory.$inject = ['$location', 'ENVIRONMENT_CONFIG'];

    function environmentFactory ($location, ENVIRONMENT_CONFIG) {
        var environment;
        console.log($location.host());
        switch ($location.host()) {
            case 'atlas.amsterdam.nl':
                environment = 'PRODUCTION';
                break;

            default:
                environment = 'DEVELOPMENT';
        }

        return ENVIRONMENT_CONFIG[environment];
    }
})();