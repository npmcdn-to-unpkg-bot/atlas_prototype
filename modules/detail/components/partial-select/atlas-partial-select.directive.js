(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .directive('atlasPartialSelect', atlasPartialSelectDirective);

    atlasPartialSelectDirective.$inject = ['api', 'atlasTemplateCompilerService'];

    function atlasPartialSelectDirective (api, atlasTemplateCompilerService) {
        return {
            restrict: 'E',
            scope: {
                apiData: '=',
                partial: '@'
            },
            link: linkFunction
        };

        function linkFunction(scope, element) {
            var partialPath,
            partialRoot;

            partialRoot = 'modules/detail/components/partial-select/partials/';
            partialPath = partialRoot + scope.partial + '.html';

            atlasTemplateCompilerService.compileTemplate(scope, element, partialPath);

            scope.loadMore = function () {
                if (!scope.apiData.next) {
                    return;
                }

                api.getByUrl(scope.apiData.next).then(function (response) {
                    //add next page if there is any or ""
                    scope.apiData.next = response._links.next.href;
                    // push results to end of scope.apiData.results
                    scope.apiData.results.push.apply(scope.apiData.results, response.results);
                });
            };
        }
    }
})();