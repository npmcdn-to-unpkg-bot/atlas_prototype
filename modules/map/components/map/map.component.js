(function () {
    angular
        .module('dpMap')
        .component('dpMap', {
            bindings: {
                mapState: '=',
                markers: '='
            },
            templateUrl: 'modules/map/map.html',
            controller: DpMapController,
            controllerAs: 'vm'
        });

    DpMapController.$inject = ['store', 'ACTIONS'];

    function DpMapController (store, ACTIONS) {
        var vm = this;

        vm.triggerSearch = function (location) {
            store.dispatch({
                type: ACTIONS.SHOW_SEARCH_RESULTS_BY_CLICK,
                payload: location
            });
        };

        vm.panTo = function (location) {
            store.dispatch({
                type: ACTIONS.MAP_PAN,
                payload: location
            });
        };

        vm.zoom = function (zoomLevel) {
            store.dispatch({
                type: ACTIONS.MAP_ZOOM,
                payload: zoomLevel
            });
        };

        vm.showLayerSelection = function () {
            store.dispatch({
                type: ACTIONS.SHOW_LAYER_SELECTION
            });
        };
    }
})();