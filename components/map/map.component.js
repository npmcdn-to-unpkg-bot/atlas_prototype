(function () {
    angular
        .module('atlas')
        .component('dpMap', {
            templateUrl: 'components/map/map.html',
            controller: DpMapController,
            controllerAs: 'vm'
        });

    DpMapController.$inject = ['store'];

    function DpMapController (store) {
        var vm = this;

        store.subscribe(render);
        render();

        vm.search = function (location) {
            store.dispatch({
                type: 'FETCH_SEARCH_RESULTS_BY_CLICK',
                payload: location
            });
        };

        vm.panTo = function (location) {
            store.dispatch({
                type: 'MAP_PAN',
                payload: location
            });
        };

        vm.zoom = function (zoomLevel) {
            store.dispatch({
                type: 'MAP_ZOOM',
                payload: zoomLevel
            });
        };

        vm.showLayerSelection = function () {
            store.dispatch({
                type: 'SHOW_LAYERS'
            });
        };

        function render () {
            var state = store.getState();

            vm.map = state.map;
        }
    }
})();