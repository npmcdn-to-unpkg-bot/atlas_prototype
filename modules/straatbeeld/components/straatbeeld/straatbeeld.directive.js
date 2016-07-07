(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpPanorama', dpPanoramaDirective);

    dpPanoramaDirective.$inject = ['marzipanoService', 'earthmineService', 'panoramaOrientation'];

    function dpPanoramaDirective (marzipanoService, earthmineService, panoramaOrientation) {
        return {
            restrict: 'E',
            scope: {
                id: '=',
                location: '=',
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

            getPanoramaState(scope.id, scope.location).then(function (panoramaState) {
                panoramaViewer = marzipanoService.initialize(container);

                marzipanoService.loadScene(panoramaState);

                scope.updateOrientation = function () {
                    panoramaOrientation.update(panoramaViewer);
                };
            });
        }

        function getPanoramaState (id, location) {
            if (angular.isNumber(id)) {
                return earthmineService.getImageDataById(id);
            } else {
                return earthmineService.getImageDataByCoordinates(
                    location[0],
                    location[1]
                );
            }
        }
    }
})();
