(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpHotspot', dpHotspotDirective);

    function dpHotspotDirective () {
        return {
            restrict: 'E',
            scope: {
                sceneId: '@',
                distance: '@',
                panoramaState: '='
            },
            templateUrl: 'modules/straatbeeld/panorama/marzipano/hotspot/hotspot.html',
            controller: DpHotspotController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    DpHotspotController.$inject = ['earthmine', 'marzipanoService'];

    function DpHotspotController (earthmine, marzipanoService) {
        var vm = this,
            minimumSize = 30;

        vm.size = Math.max(Math.round(60 - Number(vm.distance)), minimumSize);

        vm.loadScene = function () {
            earthmine.getImageDataById(Number(vm.sceneId)).then(function (data) {
                vm.panoramaState.id = data.id;
                vm.panoramaState.date = data.date;
                vm.panoramaState.location = data.location;
                vm.panoramaState.carOrientation = data.carOrientation;
                vm.panoramaState.hotspots = data.hotspots;

                marzipanoService.loadScene(vm.panoramaState);
            });
        };
    }
})();
