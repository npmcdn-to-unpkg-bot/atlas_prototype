(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('MapController', MapController);

    MapController.$inject = ['store'];

    function MapController (store) {
        var vm = this;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState();

            vm.markers = {};

            if (state.search && state.search.location) {
                vm.markers.search = {
                    icon: 'red',
                    location: state.search.location
                };
            }

            if (state.straatbeeld && state.straatbeeld.cameraLocation) {
                vm.markers.straatbeeld = {
                    icon: 'red',
                    location: state.straatbeeld.cameraLocation
                };
            }

            vm.mapState = state.map;
        }
    }
})();