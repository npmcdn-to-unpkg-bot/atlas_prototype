(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .directive('atlasApiCall', atlasApiCallDirective);

    atlasApiCallDirective.$inject = ['api'];

    function atlasApiCallDirective (api) {
        return {
            restrict: 'E',
            scope: {
                endpoint: '=',
                expand: '=',
                partial: '@'
         },
            templateUrl: 'modules/detail/components/api-call/atlas-api-call.html',
            link: linkFunction
        };

        function linkFunction(scope) {
            if (!scope.endpoint) {
                return;
            }

            scope.apiData = {};

            //vraag als true de api-expand resultaten op van BRK
            if(scope.expand) {
                scope.endpoint = scope.endpoint.replace('brk/object', 'brk/object-expand');
            }

            api.getByUrl(scope.endpoint).then(function (response) {

                scope.apiData.count = response.count;
                if(response._links.next) {
                    scope.apiData.next = response._links.next.href;
                }
                if(response.results) { //VBO & nummeraanduiding
                    scope.apiData.results = response.results;
                } else {
                    scope.apiData.results = response;
                }

            });

        }

    }
})();
