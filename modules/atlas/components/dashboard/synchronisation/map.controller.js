(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('MapController', MapController);

    MapController.$inject = ['$rootScope', 'store'];

    function MapController ($rootScope, store) {
        var vm = this;

        store.subscribe(update);

        update();

        function update () {
            var state = store.getState();

            vm.markers = [];

            if (state.search && state.search.location) {
                vm.markers.push({
                    id: 'search',
                    geometry: convertLocationToGeoJSON(state.search.location)
                });
            }

            if (state.detail && state.detail.geometry) {
                vm.markers.push({
                    id: 'detail',
                    geometry: state.detail.geometry
                });
            }

            if (state.straatbeeld && state.straatbeeld.car && state.straatbeeld.car.location) {
                vm.markers.push({
                    id: 'straatbeeld',
                    geometry: convertLocationToGeoJSON(state.straatbeeld.car.location)
                });
            }

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