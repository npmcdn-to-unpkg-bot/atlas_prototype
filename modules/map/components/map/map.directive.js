(function () {
    angular
        .module('dpMap')
        .directive('dpMap', dpMapDirective);

    dpMapDirective.$inject = [
        'L',
        'mapConfig',
        'layers',
        'geojson',
        'panning',
        'zoom',
        'variableWidth',
        'searchByClick'
    ];

    function dpMapDirective (L, mapConfig, layers, geojson, panning, zoom, variableWidth, searchByClick) {
        return {
            restrict: 'E',
            scope: {
                mapState: '=',
                markers: '='
            },
            templateUrl: 'modules/map/components/map/map.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var leafletMap,
                container,
                options;

            container = element[0].querySelector('.js-leaflet-map');
            options = angular.merge(mapConfig.MAP_OPTIONS, {
                center: scope.mapState.viewCenter,
                zoom: scope.mapState.zoom
            });

            leafletMap = L.map(container, options);

            geojson.initialize(leafletMap, scope.markers);
            panning.initialize(leafletMap);
            zoom.initialize(leafletMap);
            variableWidth.initialize(container, leafletMap);
            searchByClick.initialize(leafletMap);

            scope.$watch('mapState.viewCenter', function (viewCenter) {
                panning.panTo(leafletMap, viewCenter);
            });

            scope.$watch('mapState.zoom', function (zoomLevel) {
                zoom.setZoom(leafletMap, zoomLevel);
            });

            scope.$watch('mapState.baseLayer', function (baseLayer) {
                layers.setBaseLayer(leafletMap, baseLayer);
            });

            scope.$watch('mapState.overlays', function (newOverlays, oldOverlays) {
                getAddedOverlays(newOverlays, oldOverlays).forEach(function (overlay) {
                    layers.addOverlay(leafletMap, overlay);
                });

                getRemovedOverlays(newOverlays, oldOverlays).forEach(function (overlay) {
                    layers.removeOverlay(leafletMap, overlay);
                });
            });

            scope.$watch('markers', function (newMarkers, oldMarkers) {
                getAddedMarkers(newMarkers, oldMarkers).forEach(function (marker) {
                    console.log('add', marker);
                    geojson.add(leafletMap, marker);
                });

                getRemovedMarkers(newMarkers, oldMarkers).forEach(function (marker) {
                    geojson.remove(leafletMap, marker.id);
                });
            });
        }

        function getAddedOverlays (newOverlays, oldOverlays) {
            if (newOverlays === oldOverlays) {
                //scope.$watch is triggered on initialization with the new value equal to the old value
                return newOverlays;
            } else {
                return newOverlays.filter(function (overlay) {
                    return oldOverlays.indexOf(overlay) === -1;
                });
            }
        }

        function getRemovedOverlays (newOverlays, oldOverlays) {
            return oldOverlays.filter(function (overlay) {
                return newOverlays.indexOf(overlay) === -1;
            });
        }

        function getAddedMarkers (newMarkers, oldMarkers) {
            var oldMarkerIds = [];

            oldMarkers.forEach(function (marker) {
                oldMarkerIds.push(marker.id);
            });

            return newMarkers.filter(function (marker) {
                return oldMarkerIds.indexOf(marker.id) === -1;
            });
        }

        function getRemovedMarkers (newMarkers, oldMarkers) {
            var newMarkerIds = [];

            newMarkers.forEach(function (marker) {
                newMarkerIds.push(marker.id);
            });

            return oldMarkers.filter(function (marker) {
                return newMarkerIds.indexOf(marker.id) === -1;
            });
        }
    }
})();