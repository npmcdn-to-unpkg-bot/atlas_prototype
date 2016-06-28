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
      partialRoot,
      commonPartial;

      partialRoot = 'modules/detail/components/partial-select/partial/';

      commonPartial = {
        'aantekening': partialRoot + 'aantekening.html',
        'adressen_lijst': partialRoot + 'adressen_lijst.html',
        'brk': partialRoot + 'brk.html',
        'rechten': partialRoot + 'rechten.html'
      };

      partialPath = commonPartial[scope.partial] ||
        partialRoot + '/partial/' + scope.partial + '.html';

      pluginDetailService.compileTemplate(scope, element, partialPath);
    }
  }
})();