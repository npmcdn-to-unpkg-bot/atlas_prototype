(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .directive('atlasPartialSelect', atlasPartialSelectDirective);

    atlasPartialSelectDirective.$inject = ['$templateRequest', '$compile', '$rootScope', '$q', 'api'];

    function atlasPartialSelectDirective ($templateRequest, $compile, $rootScope, $q, api) {
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
                getCompiledHtml(templateUrl, data).then(function (html) {
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

            function getCompiledHtml (templateUrl, data) {
                return $templateRequest(templateUrl).then(function (template) {
                    var q,
                        scope;

                    q = $q.defer();

                    scope = $rootScope.$new();
                    scope.apiData = data;

                    scope.$applyAsync(function () {
                        /*
                        Wait for the next digest cycle (making this function asynchronous), the variables should be
                        rendered inside the template before returning the HTML.
                        */
                        q.resolve($compile(template)(scope));
                    });

                    return q.promise;
                });
            }
        }
    }
})();