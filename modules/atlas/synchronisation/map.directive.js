(function () {
    'use strict';

    angular
        .module('atlas')
        .directive('atlasMap', atlasMapDirective);

    atlasMapDirective.$inject = ['Map', 'store'];

    function atlasMapDirective (Map, store) {
        return {
            restrict: 'E',
            templateUrl: 'modules/atlas/synchronisation/map.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var map;

            map = Map.initialize(element[0].querySelector('.js-atlas-map'), store);
        }
    }
})();