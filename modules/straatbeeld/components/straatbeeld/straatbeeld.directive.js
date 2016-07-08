(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpStraatbeeld', dpStraatbeeldDirective);

    dpStraatbeeldDirective.$inject = ['store', 'ACTIONS', 'marzipanoService', 'earthmine'];

    function dpStraatbeeldDirective (store, ACTIONS, marzipanoService, earthmine) {
        return {
            restrict: 'E',
            scope: {
                id: '=',
                searchLocation: '=',
                date: '=',
                camera: '=',
                hotspots: '=',
                isLoading: '='
            },
            templateUrl: 'modules/straatbeeld/components/straatbeeld/straatbeeld.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var container;

            container = element[0].querySelector('.js-marzipano-viewer');

            marzipanoService.initialize(container);

            //Fetch new scene
            scope.$watchCollection(function () {
                return [scope.id, scope.searchLocation];
            }, function () {
                getEarthmineData(scope.id, scope.searchLocation).then(function (earthmineData) {
                    store.dispatch({
                        type: ACTIONS.SHOW_STRAATBEELD,
                        payload: {
                            id: earthmineData.id,
                            date: earthmineData.date,
                            camera: earthmineData.camera,
                            hotspots: earthmineData.hotspots
                        }
                    });
                });
            });

            //Show new scene
            scope.$watch('camera.location', function (location) {
                if (angular.isArray(location)) {
                    marzipanoService.loadScene(scope.id, scope.hotspots);
                }
            });
        }

        function getEarthmineData (id, location) {
            if (angular.isNumber(id)) {
                return earthmine.getImageDataById(id);
            } else {
                return earthmine.getImageDataByCoordinates(
                    location[0],
                    location[1]
                );
            }
        }
    }
})();
