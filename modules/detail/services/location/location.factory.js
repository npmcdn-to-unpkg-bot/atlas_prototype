(function(){
    'use strict';

    angular
        .module('atlasDetail')
        .factory('location', locationFactory);

        locationFactory.$inject = ['$q', 'api', 'polygonToPoint'];

        function locationFactory ($q, api, polygonToPoint) {
            return {
                'getLocation': getLocation
            };

            function getLocation(input) {
                var data = input,
                    geometrie = input.geometrie;

                return getCoordinates();

                function getCoordinates(){
                    var coordinates,
                    results = $q.defer();

                    if(geometrie){
                        if(geometrie.type === 'MultiPolygon'){
                            coordinates = polygonToPoint.calculateCenter(geometrie.coordinates[0][0]);
                            results.resolve(coordinates);
                        } else if(geometrie.type === 'Polygon'){
                            coordinates = polygonToPoint.calculateCenter(geometrie.coordinates[0]);
                            results.resolve(coordinates);
                        } else if(geometrie.type === 'Point'){
                            coordinates = geometrie.coordinates;
                            results.resolve(coordinates);
                        }
                    } else if(data.index_letter === 'A') {
                        return api.getByUrl(data.betrokken_bij.href).then(function (response) {
                            data = response;
                            geometrie = response.geometrie;
                        }).then(getCoordinates);
                    } else if(data.nummeraanduidingidentificatie) {
                        var object = data.type;
                        object = object.toLowerCase();
                        return api.getByUrl(data[object]).then(function (response) {
                            data = response;
                            geometrie = data.geometrie;
                        }).then(getCoordinates);
                    }

                    return results.promise;
                }


            }

        }
})();
