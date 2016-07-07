(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpStraatbeeld', dpStraatbeeldDirective);

    dpStraatbeeldDirective.$inject = ['store', 'ACTIONS', 'marzipanoService', 'earthmineService'];

    function dpStraatbeeldDirective (store, ACTIONS, marzipanoService, earthmineService) {
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
            var container;

            container = element[0].querySelector('.js-marzipano-viewer');

            marzipanoService.initialize(container);

            getPanoramaState(scope.id, scope.location).then(function (earthmineData) {
                store.dispatch({
                    type: ACTIONS.SHOW_STRAATBEELD,
                    payload: {
                        id: earthmineData.id,
                        camera: earthmineData.camera
                    }
                });
            });

            scope.$watch('id', function () {
                marzipanoService.loadScene(scope.id, scope.camera.heading, scope.camera.pitch, scope.camera.fov);
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
