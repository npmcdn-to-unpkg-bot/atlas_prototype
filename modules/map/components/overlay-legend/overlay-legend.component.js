(function() {
    'use strict';

    angular
        .module('dpMap')
        .component('dpOverlayLegend', {
            bindings: {
                overlays: '=',
                zoom: '='
            },
            templateUrl: 'modules/map/components/overlay-legend/overlay-legend.html',
            controller: OverlayLegend,
            controllerAs: 'vm'
        });

    function OverlayLegend($scope) {
        var vm = this;
        vm.isLegendOpen = false;
        // Layers counts
        vm.activeLayerCount = vm.overlays.length;
        vm.visibleLayersCount = vm.overlays.filter(function(elem) {
                return elem.isVisible;
            }).length;

        // Watching from component scope where the controller is called vm
        // as per controllerAs
        $scope.$watch('vm.overlays', function(newVal) {
            // Updating active and visible layers count
            vm.activeLayerCount = newVal.length;
            vm.visibleLayersCount = newVal.filter(function(elem) {
                return elem.isVisible;
            }).length;
        }, true);
        
        vm.switchLegendPane = function () {
            // Flipping the button
            vm.isLegendOpen = !vm.isLegendOpen;
        };
    }
})();
