(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('earthmineService', earthmineService);

    earthmineService.$inject = ['$http', 'earthmineDataFormatter'];

    function earthmineService ($http, earthmineDataFormatter) {
        return {
            getImageDataById: getImageDataById,
            getImageDataByCoordinates: getImageDataByCoordinates,
            getImageSourceUrl: getImageSourceUrl
        };

        function getImageDataById (id) {
            return getImageData({
                id: id
            });
        }

        function getImageDataByCoordinates (latitude, longitude) {
            return getImageData({
                lat: latitude,
                lon: longitude
            });
        }

        function getImageData (searchParams) {
            return $http({
                method: 'GET',
                //url: urls.PANO_PANO_PROXY,
                url: 'https://map-acc.datapunt.amsterdam.nl/earthmine/get_panos.php',
                params: searchParams
            }).then(function (response) {
                return earthmineDataFormatter.formatPanoramaState(response.data);
            });
        }

        function getImageSourceUrl (sceneId) {
            return 'https://map-acc.datapunt.amsterdam.nl/earthmine/tile_proxy.php?id=' + sceneId + '&f={f}&z={z}&x={' +
                'x}&y={y}';

            //return urls.PANO_TILE_PROXY + '?id=' + sceneId + '&f={f}&z={z}&x={x}&y={y}';
        }
    }
})();
