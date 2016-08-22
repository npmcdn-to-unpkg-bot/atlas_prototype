(function() {
    'use strict';

    angular
        .module('dpMap')
        .component('dpMapStatusbar', {
            restrict: 'E',
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
        vm.buttonStatus = 'plus';
        vm.visible = false;
        // Layers counts
        vm.activeLayers = vm.overlays.length;
        vm.visibleLayers = 0;
        for (var i = 0;i < vm.overlays.length;i++) {
            if (vm.overlays[i].visibility) {
                vm.visibleLayers++;
            }
        }
        // Watching from component scope where the controller is called vm
        // as per controllerAs
        $scope.$watch('vm.overlays', function(newVal) {
            // Updating active and visible layers count
            if (newVal) {
                vm.activeLayers = newVal.length;
                vm.visibleLayers = 0;
                for (var i = 0;i < newVal.length;i++) {
                    if (newVal[i].visibility) {
                        vm.visibleLayers++;
                    }
                }
            }
        }, true);
        
        vm.switchLegendPane = function () {
            // Flipping the button
            if (vm.buttonStatus === 'plus') {
                vm.buttonStatus = 'minimize';
                vm.visible = true;

            } else {
                vm.buttonStatus = 'plus';
                vm.visible = false;
            }
        };
    }
    
})();
