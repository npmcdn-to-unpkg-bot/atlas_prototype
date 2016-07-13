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

    AtlasStraatbeeldController.$inject = ['environment', 'geojsonCenter', 'wgs84RdConverter'];

    function AtlasStraatbeeldController (environment, geojsonCenter, wgs84RdConverter) {
        var vm = this,
            geojson = vm.apiData.results.geometrie.coordinates,
            center,
            centerWgs84;

        if(geojson[0][0]){
            center = geojsonCenter.getCenter(geojson);
        } else {
            center = geojson;
        }

        centerWgs84 = wgs84RdConverter.rdToWgs84(center);

        vm.imageUrl =   environment.PANO_VIEW_PROXY +
                        '?lon=' + centerWgs84[0] +
                        '&lat=' + centerWgs84[1] +
                        '&width=240&height=144';
    }
})();