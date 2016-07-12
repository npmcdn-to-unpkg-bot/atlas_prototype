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
                vm.markers.search = convertLocationToGeoJSON(state.search.location);
            }

            if (state.detail && state.detail.geometry) {
                vm.markers.detail = state.detail.geometry;
            }

            if (state.straatbeeld && state.straatbeeld.car && state.straatbeeld.car.location) {
                vm.markers.straatbeeld = convertLocationToGeoJSON(state.straatbeeld.car.location);
            }
            console.log(vm.markers);
            vm.mapState = state.map;
        }

        function convertLocationToGeoJSON (location) {
            return {
                type: 'Point',
                coordinates: location
            };
        }
    }
})();