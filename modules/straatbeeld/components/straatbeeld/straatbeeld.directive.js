(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpStraatbeeld', dpStraatbeeldDirective);

    dpStraatbeeldDirective.$inject = ['store', 'ACTIONS', 'marzipanoService', 'earthmine', 'orientation'];

    function dpStraatbeeldDirective (store, ACTIONS, marzipanoService, earthmine, orientation) {
        return {
            restrict: 'E',
            scope: {
                state: '='
            },
            templateUrl: 'modules/straatbeeld/components/straatbeeld/straatbeeld.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var container,
                viewer;

            container = element[0].querySelector('.js-marzipano-viewer');
            viewer = marzipanoService.initialize(container);

            scope.updateOrientation = function () {
                orientation.update(viewer, scope.state.car);
            };

            //Fetch new scene
            scope.$watchCollection(function () {
                return [scope.state.id, scope.state.searchLocation];
            }, function () {
                getEarthmineData(scope.state.id, scope.state.searchLocation).then(function (earthmineData) {
                    store.dispatch({
                        type: ACTIONS.SHOW_STRAATBEELD,
                        payload: earthmineData
                    });
                });
            });

            //Show new scene
            scope.$watchCollection('state.car.location', function (location) {
                if (angular.isArray(location)) {
                    marzipanoService.loadScene(
                        scope.state.id,
                        scope.state.car,
                        scope.state.camera,
                        scope.state.hotspots
                    );
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
