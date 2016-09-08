(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .component('dpHotspot', {
            bindings: {
                sceneId: '=',
                distance: '=',
                heading: '=',
                pitch: '='
            },
            templateUrl: 'modules/straatbeeld/components/hotspot/hotspot.html',
            controller: DpHotspotController,
            controllerAs: 'vm'
        });

    DpHotspotController.$inject = ['store', 'ACTIONS'];

    function DpHotspotController (store, ACTIONS) {
        var vm = this,
            maximumDistance = 12,
            minimumSize = 20,
            maximumSize = 60;

        var ratio = (maximumSize - minimumSize) / maximumDistance;

        vm.size = maximumSize - Math.round(ratio * vm.distance);

        vm.loadScene = function () {
            store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: { id: vm.location, heading: heading, isInitial: false }   
            });
        };
    }
})();
