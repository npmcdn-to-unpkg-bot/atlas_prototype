(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('earthmine', earthmine);

    earthmine.$inject = ['$http', 'straatbeeldConfig', 'earthmineDataFormatter'];

    function earthmine ($http, straatbeeldConfig, earthmineDataFormatter) {
        return {
            getImageDataById: getImageDataById,
            getImageDataByCoordinates: getImageDataByCoordinates,
            getImageSourceUrl: getImageSourceUrl
        };

        function getImageDataById (id) {
            //console.log(straatbeeldConfig.NEW_DATA_ENDPOINT + id + '/');
            return getImageData(
                straatbeeldConfig.NEW_DATA_ENDPOINT + id + '/',
                {
                    radius: 100
                }
            );
        }

        function getImageDataByCoordinates (latitude, longitude) {
            return getImageData(
                straatbeeldConfig.NEW_DATA_ENDPOINT,
                {
                    lat: latitude,
                    lon: longitude,
                    radius: 100
                }
            );
        }

        function getImageData (url, searchParams) {
            //console.log(url, searchParams);
            return $http({
                method: 'GET',
                url: url,
                params: searchParams
            }).then(function (response) {
                return response.data; //earthmineDataFormatter.formatPanoramaState(response.data);
            });
        }

        function getImageSourceUrl (sceneId) {
            return straatbeeldConfig.TILE_ENDPOINT + '?id=' + sceneId + '&f={f}&z={z}&x={x}&y={y}';
        }
    }
})();
