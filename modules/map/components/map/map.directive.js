(function () {
    angular
        .module('dpMap')
        .directive('dpMap', dpMapDirective);

    dpMapDirective.$inject = ['$window', 'L', 'crsService', 'mapConfig', 'layers'];

    function dpMapDirective ($window, L, crsService, mapConfig, layers) {
        return {
            restrict: 'E',
            scope: {
                mapState: '=',
                markers: '=',
                store: '='
            },
            templateUrl: 'modules/map/components/map/map.html',
            controller: DpMapController,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var leafletMap,
                container,
                options;

            container = element[0].querySelector('.js-leaflet-map');

            options = {
                center: L.latLng.apply(null, scope.vm.mapState.viewCenter),
                zoom: scope.vm.mapState.zoom,
                crs: crsService.getRd(),
                zoomControl: false,
                attributionControl: false,
                maxBounds: mapConfig.AMSTERDAM_BOUNDS
            };

            leafletMap = L.map(container, options);

            //Als de parent wijzigt van 1/3 naar 2/3 dan moet Leaflet meer tiles tekenen
            scope.$watch(function () {
                return container.clientWidth;
            }, function () {
                console.log('invalidate');
                leafletMap.invalidateSize();
            });

            scope.$watch('vm.mapState.baseLayer', function (baseLayer) {
                layers.setBaseLayer(leafletMap, baseLayer);
            });
        }
    }

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
            console.log(vm.store);
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