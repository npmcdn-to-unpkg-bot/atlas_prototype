(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .directive('atlasStraatbeeld', atlasStraatbeeldDirective);

    function atlasStraatbeeldDirective () {
        return {
            restrict: 'E',
            scope: {
                apiData: '=',
            },
            templateUrl: 'modules/detail/components/straatbeeld/straatbeeld.html',
            controller: AtlasStraatbeeldController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    AtlasStraatbeeldController.$inject = ['$q', 'api', 'environment', 'polygonToPoint', 'wgs84RdConverter'];

    function AtlasStraatbeeldController ($q, api, environment, polygonToPoint, wgs84RdConverter) {
        var vm = this,
            data = vm.apiData.results,
            geometrie = data.geometrie;

        getImageUrl();

        function getImageUrl() {
            getLocation().then(function(coordinates){
                var coordinatesWgs84;

                coordinatesWgs84 = wgs84RdConverter.rdToWgs84(coordinates);

                vm.imageUrl = environment.PANO_VIEW_PROXY +
                            '?lon=' + coordinatesWgs84[0] +
                            '&lat=' + coordinatesWgs84[1] +
                            '&width=240&height=144';
            });
        }
        function getLocation() {
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
                }).then(getLocation);
            } else if(data.nummeraanduidingidentificatie) {
                var object = data.type;
                object = object.toLowerCase();
                return api.getByUrl(data[object]).then(function (response) {
                    data = response;
                    geometrie = response.geometrie;
                }).then(getLocation);
            }

            return results.promise;
        }

    }
})();