(function () {
    angular
        .module('dpMap')
        .component('dpMap', {
            bindings: {
                mapState: '=',
                markers: '=',
                store: '='
            },
            templateUrl: 'modules/map/components/map/map.html',
            controller: DpMapController,
            controllerAs: 'vm'
        });

    DpMapController.$inject = ['ACTIONS'];

    function DpMapController (ACTIONS) {
        var vm = this;

        vm.triggerSearch = function (location) {
            vm.store.dispatch({
                type: ACTIONS.SHOW_SEARCH_RESULTS_BY_CLICK,
                payload: location
            });
        };

        vm.panTo = function (location) {
            vm.store.dispatch({
                type: ACTIONS.MAP_PAN,
                payload: location
            });
        };

        vm.zoom = function (zoomLevel) {
            vm.store.dispatch({
                type: ACTIONS.MAP_ZOOM,
                payload: zoomLevel
            });
        };

        vm.showLayerSelection = function () {
            vm.store.dispatch({
                type: ACTIONS.SHOW_LAYER_SELECTION
            });
        };
    }
})();