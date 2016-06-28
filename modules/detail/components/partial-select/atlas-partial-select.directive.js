(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('atlasPartialSelect', atlasPartialSelectDirective);

  atlasPartialSelectDirective.$inject = ['pluginDetailService'];

  function atlasPartialSelectDirective (pluginDetailService) {
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

      pluginDetailService.compileTemplate(scope, element, partialPath);
    }
  }
})();