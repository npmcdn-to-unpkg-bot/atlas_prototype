(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .directive('atlasApiData', atlasApiDataDirective);

    atlasApiDataDirective.$inject = ['api'];

    //gebruikt bij de nummeraanduiding header, mogelijk nog te refactoren
    //om ook gebruik te maken van api-call / partial-select
    function atlasApiDataDirective (api) {
        return {
            restrict: 'E',
            scope: false,
            transclude: true,
            templateUrl: 'modules/detail/components/api-data/api-data.html',
            link: linkFunction
        };

        function linkFunction (scope, element, attrs) {
            if (angular.isUndefined(scope.apiDataReady)) {
                scope.apiDataReady = {};
            }

            scope.apiDataReady[scope.$id] = false;

            api.getByUrl(attrs.url).then(function (data) {
                scope[attrs.localScope] = data;

                scope.apiDataReady[scope.$id] = true;
            });
        }
    }
})();
