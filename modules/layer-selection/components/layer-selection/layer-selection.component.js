(function () {
    'use strict';

    angular
        .module('atlasLayerSelection')
        .component('atlasLayerSelection', {
            bindings: {
                baseLayer: '@',
                overlays: '=',
                zoom: '='
            },
            templateUrl: 'modules/layer-selection/components/layer-selection/layer-selection.html',
            controller: AtlasLayerSelectionController,
            controllerAs: 'vm'
        });

    AtlasLayerSelectionController.$inject = ['store', 'ACTIONS'];

    function AtlasLayerSelectionController (store, ACTIONS) {
        var vm = this;

        vm.setBaseLayer = function (baseLayer) {
            store.dispatch({
                type: ACTIONS.MAP_SET_BASELAYER,
                payload: baseLayer
            });
        };

        vm.addOverlay = function (overlay) {
            store.dispatch({
                type: ACTIONS.MAP_ADD_OVERLAY,
                payload: overlay
            });
        };

        vm.removeOverlay = function (overlay) {
            store.dispatch({
                type: ACTIONS.MAP_REMOVE_OVERLAY,
                payload: overlay
            });
        };

        vm.hideLayers = function () {
            store.dispatch({
                type: ACTIONS.HIDE_LAYER_SELECTION
            });
        };
    }
})();