(function () {
    'use strict';

    angular
        .module('atlas')
        .component('dpLayers', {
            templateUrl: 'components/layer-selection/layer-selection.html',
            controller: DpLayersController,
            controllerAs: 'vm'
        });

    DpLayersController.$inject = ['store'];

    function DpLayersController (store) {
        var vm = this;

        store.subscribe(render);
        render();

        function render () {
            var state = store.getState();

            vm.map = state.map;

            vm.setBaseLayer = function (baseLayer) {
                store.dispatch({
                    type: 'MAP_SET_BASELAYER',
                    payload: baseLayer
                })
            };

            vm.addOverlay = function (overlay) {
                store.dispatch({
                    type: 'MAP_ADD_OVERLAY',
                    payload: overlay
                })
            };

            vm.removeOverlay = function (overlay) {
                store.dispatch({
                    type: 'MAP_REMOVE_OVERLAY',
                    payload: overlay
                })
            };

            vm.hideLayers = function () {
                store.dispatch({
                    type: 'HIDE_LAYERS'
                });
            };
        }
    }
})();