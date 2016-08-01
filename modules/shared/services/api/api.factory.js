(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('api', apiFactory);

    apiFactory.$inject = ['$http', 'environment'];

    function apiFactory ($http, environment) {
        return {
            getByUrl: getByUrl,
            getByUri: getByUri
        };

        function getByUrl (url, params) {
            return $http({
                method: 'GET',
                url: url,
                params: params,
                /*
                Caching is set to false to enforce distinction between logged in users and guests. The API doesn't
                support tokens yet.
                */
                cache: false
            }).then(function (response) {
                return response.data;
            });
        }

        function getByUri (uri, params) {
            return getByUrl(environment.API_ROOT + uri, params);
        }
    }
})();