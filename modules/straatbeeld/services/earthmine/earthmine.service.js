(function () {
  'use strict';

  angular
    .module('dpStraatbeeld')
    .service('earthmineService', earthmineService);

  earthmineService.$inject = ['$http', 'urls', 'earthmineDataFormatter'];

  function earthmineService ($http, urls, earthmineDataFormatter) {
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
        url: urls.PANO_PANO_PROXY,
        params: searchParams
      }).then(function (response) {
        return earthmineDataFormatter.formatPanoramaState(response.data);
      });
    }

    function getImageSourceUrl (sceneId) {
      return urls.PANO_TILE_PROXY + '?id=' + sceneId + '&f={f}&z={z}&x={x}&y={y}';
    }
  }
})();
