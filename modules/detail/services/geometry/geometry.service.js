/*
(function(){
  'use strict';

  angular
    .module('atlasApp.kaart')
    .service('geometryService', geometryService);

    geometryService.$inject = ['$http', 'URIParser', 'urls'];

    function geometryService ($http, URIParser, urls) {
      return {
        'getByUri': getByUri
      };

      /*
       * @param {String} uri
       *
       * @returns {Promise} - An object with GeoJSON or null
       *//*
      function getByUri (uri) {
        return getDataByUri(uri).then(getGeometry);

        function getGeometry (data) {
          if (angular.isObject(data.geometrie)) {
            return data.geometrie;
          } else if (isAPerceel(data)) {
            return getGPerceel(data).then(getGeometry);
          } else if (isNummeraanduiding()) {
            return getAdresseerbaarObject(data).then(getGeometry);
          } else {
            return null;
          }
        }

        function isAPerceel (data) {
          var parsedUri = URIParser.parseUri(uri);

          return parsedUri.dataset === 'brk' &&
            parsedUri.subject === 'object' &&
            data.index_letter === 'A';
        }

        function getGPerceel (aPerceelData) {
          //Retrieve a list of all related G percelen
          return $http.get(aPerceelData.g_percelen.href).then(function (gPercelen) {
            //Get the first G perceel
            return $http.get(gPercelen.data.results[0]._links.self.href).then(function (response) {
              return response.data;
            });
          });
        }

        function isNummeraanduiding () {
          var parsedUri = URIParser.parseUri(uri);

          return parsedUri.dataset === 'bag' &&
            parsedUri.subject === 'nummeraanduiding';
        }

        function getAdresseerbaarObject (nummeraanduidingData) {
          //Retrieve the related adresseerbaar object
          var object = nummeraanduidingData.type;
          object = object.toLowerCase();
          return $http.get(nummeraanduidingData[object]).then(function (response) {
            return response.data;
          });
        }
      }

      function getDataByUri (uri) {
        return $http({
          method: 'GET',
          url: urls.API_ROOT + uri
        }).then(function (response) {
          return response.data;
        });
      }
    }
})();
*/