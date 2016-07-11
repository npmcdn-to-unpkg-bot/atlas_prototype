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

    AtlasStraatbeeldController.$inject = ['environment', 'geojsonCenter'];

    function AtlasStraatbeeldController (environment, geojsonCenter) {
        var vm = this,
            location = vm.apiData.results.geometrie.coordinates;

        console.log(vm.apiData);
        console.log(location[0][0]);

        if(location[0][0]){
            location = geojsonCenter.getCenter(location);
        }

        vm.imageUrl = environment.PANO_VIEW_PROXY +
            '?lat=' + location[0] +
            '&lon=' + location[1] +
            '&width=240&height=144';

        console.log(vm.imageUrl);
    }
})();