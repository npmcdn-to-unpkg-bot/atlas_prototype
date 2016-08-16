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
        vm.buttonStatus = '+';
        vm.visible = false;
        // Layers counts
        vm.activeLayers = vm.overlays.length;
        // Watching from component scope where the controller is called vm
        // as per controllerAs
        $scope.$watch('vm.overlays', function(newVal) {
            if (newVal) {
                vm.activeLayers = newVal.length;    
            }
        });
        
        vm.switchLegendPane = function () {
            // Flipping the button
            if (vm.buttonStatus === '+') {
                vm.buttonStatus = '-';
                vm.visible = true;

            } else {
                vm.buttonStatus = '+';
                vm.visible = false;
            }
        };
    }
    
})();
