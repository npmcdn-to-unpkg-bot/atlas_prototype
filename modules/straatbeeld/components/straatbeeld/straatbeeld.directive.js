(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpPanorama', dpPanoramaDirective);

    dpPanoramaDirective.$inject = ['marzipanoService', 'panoramaOrientation'];

    function dpPanoramaDirective (marzipanoService, panoramaOrientation) {
        return {
            restrict: 'E',
            scope: {
                id: '=',
                camera: '=',
                isLoading: '='
            },
            templateUrl: 'modules/straatbeeld/components/straatbeeld/straatbeeld.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var container,
                panoramaViewer;

            container = element[0].querySelector('.js-marzipano-viewer');

            panoramaViewer = marzipanoService.initialize(container);
            marzipanoService.loadScene(scope.panoramaState);

            scope.updateOrientation = function () {
                panoramaOrientation.update(panoramaViewer, scope.panoramaState);
            };
        }
    }
})();
