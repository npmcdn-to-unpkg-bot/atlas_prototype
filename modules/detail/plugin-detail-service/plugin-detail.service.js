(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .service('pluginDetailService', pluginDetailService);

  pluginDetailService.$inject = ['$templateRequest', '$compile'];

  function pluginDetailService ($templateRequest, $compile) {
    return {
      compileTemplate: compileTemplate
    };

    function compileTemplate (scope, element, templateName) {
      // templateRequest caches the result
      $templateRequest(templateName).then(function (html) {
        var template = angular.element(html);

        element.append(template);
        $compile(template)(scope);
      });
    }
  }
})();
