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
                state: '='
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
            scope.$watch('state.camera.location', function (location) {
                if (angular.isArray(location)) {
                    marzipanoService.loadScene(scope.state.id, scope.state.hotspots, scope.state.camera);
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
