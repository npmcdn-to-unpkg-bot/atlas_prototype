(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('api', apiFactory);

    apiFactory.$inject = ['$http'];

    function apiFactory ($http) {
        return {
            getByUrl: getByUrl
        };

        function getByUrl (url) {
            return $http({
                method: 'GET',
                url: url,
                /*
                Caching is set to false to enforce distinction between logged in users and guests. The API doesn't
                support tokens yet.
                */
                cache: false
            }).then(function (response) {
                return response.data;
            });
        }
    }
})();