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
            //console.log(uri);
            return $http({
                method: 'GET',
                url: 'https://api.datapunt.amsterdam.nl/' + uri.uri
            }).then(function (response) {
               return response.data;
            });
        }
    }
})();