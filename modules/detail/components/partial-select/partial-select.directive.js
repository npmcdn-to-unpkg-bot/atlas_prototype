(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .directive('atlasPartialSelect', atlasPartialSelectDirective);

    atlasPartialSelectDirective.$inject = ['$q', 'api', 'partialCompiler'];

    function atlasPartialSelectDirective ($q, api, partialCompiler) {
        return {
            restrict: 'E',
            scope: {
                apiData: '=',
                partial: '@'
            },
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var templateUrl = 'modules/detail/components/partial-select/partials/' + scope.partial + '.html';

            //Step 1; retrieve all data needed to render the template
            getPaginationData(scope.apiData).then(function (paginationData) {
                var data = angular.merge(angular.copy(scope.apiData), paginationData);

                //Step 2; Get the $compiled HTML and append it
                partialCompiler.getHtml(templateUrl, data).then(function (html) {
                    element.append(html);
                });
            });

            function getPaginationData (apiData) {
                if (angular.isString(apiData.next)) {
                    return api.getByUrl(apiData.next).then(function (response) {
                        return {
                            next: response._links.next.href,
                            results: [].concat(apiData.results, response.results)
                        };
                    });
                } else {
                    var q = $q.defer();

                    q.resolve({});

                    return q.promise;
                }
            }
        }
    }
})();