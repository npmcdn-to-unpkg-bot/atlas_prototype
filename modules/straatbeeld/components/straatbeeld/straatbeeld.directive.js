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
                searchLocation: '=',
                camera: '=',
                isLoading: '='
            },
            templateUrl: 'modules/straatbeeld/components/straatbeeld/straatbeeld.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var container,
                hotspots;

            container = element[0].querySelector('.js-marzipano-viewer');

            marzipanoService.initialize(container);

            //Fetch new scene
            scope.$watchCollection(function () {
                return [scope.id, scope.searchLocation];
            }, function () {
                getEarthmineData(scope.id, scope.searchLocation).then(function (earthmineData) {
                    hotspots = earthmineData.hotspots;

                    store.dispatch({
                        type: ACTIONS.SHOW_STRAATBEELD,
                        payload: {
                            id: earthmineData.id,
                            camera: earthmineData.camera
                        }
                    });
                });
            });

            //Show new scene
            scope.$watch('camera.location', function (location) {
                marzipanoService.loadScene(scope.id);

                //console.log(hotspots);
            });
        }

        function getEarthmineData (id, location) {
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
