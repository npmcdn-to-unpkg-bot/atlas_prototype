(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpStraatbeeld', dpStraatbeeldDirective);

    dpStraatbeeldDirective.$inject = [
        'store',
        'ACTIONS',
        'marzipanoService',
        'earthmineService',
        'earthmineDataFormatter',
        'panoramaOrientation'
    ];

    function dpStraatbeeldDirective (
        store,
        ACTIONS,
        marzipanoService,
        earthmineService,
        earthmineDataFormatter,
        panoramaOrientation) {

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
            panoramaViewer = marzipanoService.initialize(container);
            scope.updateOrientation = function () {
                panoramaOrientation.update(panoramaViewer);
            };

            getPanoramaState(scope.id, scope.location).then(function (panoramaState) {
                console.log(panoramaState);
                store.dispatch({
                    type: ACTIONS.SHOW_STRAATBEELD,
                    payload: panoramaState
                });
            });

            scope.$watch('id', function () {
                console.log(scope.id, scope.camera);
                marzipanoService.loadScene(scope.id, scope.camera);
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
