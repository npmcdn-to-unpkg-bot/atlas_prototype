(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .service('atlasTemplateCompilerService', atlasTemplateCompilerService);

    atlasTemplateCompilerService.$inject = ['$templateRequest', '$compile'];

    function atlasTemplateCompilerService ($templateRequest, $compile) {
        return {
            compileTemplate: compileTemplate
        };

        function compileTemplate (scope, element, templateName) {
            // templateRequest caches the result
            $templateRequest(templateName).then(function (templateHtml) {
                var template = angular.element(templateHtml);

                element.append(template);
                $compile(template)(scope);
            });
        }
    }
})();
