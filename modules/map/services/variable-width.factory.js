(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('variableWidth', variableWidthFactory);

    variableWidthFactory.$inject = ['$rootScope'];

    function variableWidthFactory ($rootScope) {
        return {
            initialize: initialize
        };

        function initialize (container, leafletMap) {
            $rootScope.$watch(function () {
                return container.clientWidth;
            }, function () {
                leafletMap.invalidateSize();
            });
        }
    }
})();