(function() {
    'use strict';

    angular
        .module('dpMap')
        .component('dpMapStatusbar', {
            bindings: {
                overlays: '=',
                zoom: '='
            },
            templateUrl: 'modules/map/components/statusbar/statusbar.html',
            controller: StatusbarController,
            controllerAs: 'vm'
        });

    function StatusbarController($scope) {
        var vm = this;
        vm.isLegendOpen = false;
        // Layers counts
        vm.activeLayers = vm.overlays.length;
        vm.visibleLayers = vm.overlays.filter(function(elem) {
                return elem.isVisible;
            }).length;

        // Watching from component scope where the controller is called vm
        // as per controllerAs
        $scope.$watch('vm.overlays', function(newVal) {
            // Updating active and visible layers count
            vm.activeLayers = newVal.length;
            vm.visibleLayers = newVal.filter(function(elem) {
                return elem.isVisible;
            }).length;
        }, true);
        
        vm.switchLegendPane = function () {
            // Flipping the button
            vm.isLegendOpen = !vm.isLegendOpen;
        };
    }
})();
