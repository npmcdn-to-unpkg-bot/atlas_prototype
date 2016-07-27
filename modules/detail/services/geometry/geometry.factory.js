(function(){
    'use strict';

    angular
        .module('atlasDetail')
        .factory('geometry', geometryFactory);

        geometryFactory.$inject = ['api'];

        function geometryFactory (api) {
            return {
                getGeoJSON: getGeoJSON
            };

            /*
             * @param {String} url
             *
             * @returns {Promise} - An object with GeoJSON or null
             */
            function getGeoJSON (url) {
                return api.getByUrl(url).then(getGeometry);

                function getGeometry (data) {
                    if (angular.isObject(data.geometrie)) {
                        return data.geometrie;
                    } else if (isAPerceel(url, data)) {
                        return getGPerceel(data).then(getGeometry);
                    } else if (isNummeraanduiding(url)) {
                        return getAdresseerbaarObject(data).then(getGeometry);
                    } else {
                        return null;
                    }
                }

                function isAPerceel (url, data) {
                    return url.indexOf('brk/object') !== -1 && data.index_letter === 'A';
                }

                function getGPerceel (aPerceelData) {
                    //Retrieve a list of all related G percelen
                    return api.getByUrl(aPerceelData.g_percelen.href).then(function (gPercelen) {
                        //Get the first G perceel
                        return api.getByUrl(gPercelen.results[0]._links.self.href);
                    });
                }

                function isNummeraanduiding (url) {
                    return url.indexOf('bag/nummeraanduiding') !== -1;
                }

                function getAdresseerbaarObject (nummeraanduidingData) {
                    var object = nummeraanduidingData.type;
                    object = object.toLowerCase();

                    return api.getByUrl(nummeraanduidingData[object]);
                }
            }
        }
})();