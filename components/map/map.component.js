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
                type: 'SEARCH_BY_CLICK',
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

        function render () {
            var state = store.getState();

            vm.map = state.map;


        }
    }
})();