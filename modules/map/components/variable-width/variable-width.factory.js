(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('variableWidth', variableWidthFactory);

    variableWidthFactory.$inject = ['$rootScope'];

    function variableWidthFactory ($rootScope) {
        return {
            watch: watch
        };

        function watch (container, leafletMap) {
            $rootScope.$watch(function () {
                return container.clientWidth;
            }, function () {
                leafletMap.invalidateSize();
            });
        }
    }
})();