(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpStraatbeeld', dpStraatbeeldDirective);

    dpStraatbeeldDirective.$inject = ['$rootScope', 'store', 'ACTIONS', 'marzipanoService', 'earthmine', 'orientation'];

    function dpStraatbeeldDirective ($rootScope, store, ACTIONS, marzipanoService, earthmine, orientation) {
        return {
            restrict: 'E',
            scope: {
                state: '=',
                isPrintMode: '='
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
                if (!scope.state.isLoading) {
                    orientation.update(viewer, scope.state.car);
                }
            };

          

            //Fetch scene
            scope.$watch('state.id', function (id) {
                console.log('watched');
                console.log(id);
                if (angular.isString(id)) {
                   
                    earthmine.getImageDataById(id).then(function (earthmineData) {
                        if (scope.state.isInitial) {
                            console.log('initial');
                            store.dispatch({
                                type: ACTIONS.SHOW_STRAATBEELD_INITIAL,
                                payload: earthmineData
                            });
                        } else {
                            store.dispatch({
                                type: ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT,
                                payload: earthmineData
                            });
                        }
                       
                    });
                }
            });

            //Show new scene
            scope.$watchCollection('state.car.location', function (location) {
                if (angular.isArray(location)) {
                    marzipanoService.loadScene(
                        scope.state.id,
                        scope.state.image,
                        scope.state.car,
                        scope.state.camera,
                        scope.state.hotspots
                    );
                }
            });

            //Re-render the Marzipano viewer if the size changes (through an added parent CSS class)
            scope.$watch('isPrintMode', function () {
                $rootScope.$applyAsync(function () {
                    viewer.updateSize();
                });
            });
        }
    }
})();
