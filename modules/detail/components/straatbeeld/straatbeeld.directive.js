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

    AtlasStraatbeeldController.$inject = ['environment', 'location', 'wgs84RdConverter'];

    function AtlasStraatbeeldController (environment, location, wgs84RdConverter) {
        var vm = this,
            data = vm.apiData.results;

        getImageUrl();

        function getImageUrl() {
            location.getLocation(data).then(function(coordinates){
                var coordinatesWgs84;

                coordinatesWgs84 = wgs84RdConverter.rdToWgs84(coordinates);

                vm.imageUrl = environment.PANO_VIEW_PROXY +
                            '?lon=' + coordinatesWgs84[1] +
                            '&lat=' + coordinatesWgs84[0] +
                            '&width=240&height=144';
            });
        }
    }
})();