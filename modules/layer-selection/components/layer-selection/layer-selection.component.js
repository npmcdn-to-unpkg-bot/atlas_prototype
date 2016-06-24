(function () {
    'use strict';

    angular
        .module('atlasLayerSelection')
        .component('atlasLayerSelection', {
            bindings: {
                activeBaseLayer: '@baseLayer',
                overlays: '=',
                zoom: '='
            },
            templateUrl: 'modules/layer-selection/components/layer-selection/layer-selection.html',
            controller: AtlasLayerSelectionController,
            controllerAs: 'vm'
        });

    AtlasLayerSelectionController.$inject = ['$rootScope', 'BASE_LAYERS', 'OVERLAYS', 'store', 'ACTIONS'];

    function AtlasLayerSelectionController ($rootScope, BASE_LAYERS, OVERLAYS, store, ACTIONS) {
        var vm = this;

        vm.baseLayers = BASE_LAYERS;

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