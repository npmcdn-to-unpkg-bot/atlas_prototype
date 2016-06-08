(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('api', apiFactory);

    apiFactory.$inject = ['$http', 'environment'];

    function apiFactory ($http, environment) {
        return {
            get: get
        };

        function get (uri) {
            return $http({
                method: 'GET',
                url: environment.API_ROOT + uri,
                cache: false
            }).then(function (response) {
                return response.data;
            });
        }
    }
})();