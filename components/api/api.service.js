(function () {
    'use strict';

    angular
        .module('atlas')
        .service('api', apiService);

    apiService.$inject = ['$http'];

    function apiService ($http) {
        return {
            fetchDetail: fetchDetail
        };

        function fetchDetail (uri) {
            return $http({
                method: 'GET',
                url: 'https://api.datapunt.amsterdam.nl/bag/' + uri
            }).then(function (response) {
               return response.data;
            });
        }
    }
})();