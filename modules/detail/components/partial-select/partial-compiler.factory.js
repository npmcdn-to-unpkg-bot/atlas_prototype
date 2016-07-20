(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .factory('partialCompiler', partialCompilerFactory);

    partialCompilerFactory.$inject = ['$q', '$compile', '$rootScope', '$templateRequest'];

    function partialCompilerFactory ($q, $compile, $rootScope, $templateRequest) {
        return {
            getHtml: getHtml
        };

        function getHtml (templateUrl, data) {
            return $templateRequest(templateUrl).then(function (template) {
                var q,
                    html,
                    scope;

                q = $q.defer();

                scope = $rootScope.$new();
                scope.apiData = data;

                html = $compile(template)(scope);

                $rootScope.$applyAsync(function () {
                    /*
                     Wait for the next digest cycle (making this function asynchronous), the variables should be
                     rendered inside the template before returning the HTML.
                     */
                    q.resolve(html);
                });

                return q.promise;
            });
        }
    }
})();