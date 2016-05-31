(function () {
    angular
        .module('atlas')
        .component('dpMap', {
            templateUrl: 'components/map/map.html',
            controller: DpMapController,
            controllerAs: 'vm'
        });

    DpMapController.$inject = ['store', 'ACTIONS'];

    function DpMapController (store, ACTIONS) {
        var vm = this;

        store.subscribe(render);
        render();

        vm.triggerSearch = function (location) {
            store.dispatch({
                type: ACTIONS.FETCH_SEARCH_RESULTS_BY_CLICK,
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

        function render () {
            var state = store.getState();

            vm.map = state.map;
            vm.search = state.search;
        }
    }
})();