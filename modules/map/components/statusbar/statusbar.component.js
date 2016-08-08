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
            controllerAs: 'statusbar'
        });

    function StatusbarController($scope) {
        var statusbar = this;
        statusbar.buttonStatus = '+';
        statusbar.visible = false;
        // Layers counts
        statusbar.activeLayers = Object.keys(statusbar.overlays).length;
        // Watching from component scope where the controller is called statusbar
        // as per controllerAs
        $scope.$watch('statusbar.overlays', function(newVal) {
            if (newVal) {
                statusbar.activeLayers = newVal.length;    
            }
        });
        

        statusbar.switchLegendPane = function () {
            // Flipping the button
            if (statusbar.buttonStatus === '+') {
                statusbar.buttonStatus = '-';
                statusbar.visible = true;

            } else {
                statusbar.buttonStatus = '+';
                statusbar.visible = false;
            }
        };
    }
    
})();
