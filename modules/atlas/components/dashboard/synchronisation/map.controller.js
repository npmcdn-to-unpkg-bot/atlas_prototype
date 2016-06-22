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
                    location: state.search.location
                };
            }

            if (state.straatbeeld && state.straatbeeld.camera && state.straatbeeld.camera.location) {
                vm.markers.straatbeeld = {
                    location: state.straatbeeld.camera.location
                };
            }

            vm.mapState = state.map;
        }
    }
})();