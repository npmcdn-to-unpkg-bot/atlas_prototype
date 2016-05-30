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

        vm.panTo = function (location) {
            store.dispatch({
                type: 'MAP_PAN',
                location: location
            });
        };

        vm.zoomIn = function () {
            store.dispatch({
                type: 'MAP_ZOOM_IN'
            });
        };

        vm.zoomOut = function () {
            store.dispatch({
                type: 'MAP_ZOOM_OUT'
            });
        };

        function render () {
            var state = store.getState();

            vm.location = state.map.location;
            vm.zoom = state.map.zoom;
        }
    }
})();