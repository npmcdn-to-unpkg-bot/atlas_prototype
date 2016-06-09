(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('api', apiFactory);

    apiFactory.$inject = ['$http', 'environment'];

    function apiFactory ($http, environment) {
        return {
            get: getByUri
        };

        function getByUri (uri) {
            return $http.get(
                environment.API_ROOT + uri,
                {
                    method: 'GET',
                    cache: false
                }
            ).then(function (response) {
                return response.data;
            });
        }
    }
})();