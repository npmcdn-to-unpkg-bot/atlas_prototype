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
            leafletMap.invalidateSize();
            
            $rootScope.$watch(function () {
                return container.clientWidth;
            }, function (newWidth, oldWidth) {
                console.log('invalidateSize');

                if (newWidth !== oldWidth) {
                    leafletMap.invalidateSize();
                }
            });
        }
    }
})();