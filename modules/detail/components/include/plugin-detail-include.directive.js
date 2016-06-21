(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('dpPluginDetailInclude', dpPluginDetailIncludeDirective);

  dpPluginDetailIncludeDirective.$inject = ['pluginDetailService'];

  /*
   * @description Directive to create an include with isolated scope
   *
   * @example
   * <plugin-detail-include page="'rechten'" object="object.rechten"></plugin-detail-include>
   *
   */
  function dpPluginDetailIncludeDirective (pluginDetailService) {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        page: '@'
      },
      link: linkFunction
    };

    function linkFunction (scope, element) {

      var templateName;

      if(scope.page) {
        templateName = 'plugins/plugin-detail/templates/common/' + scope.page + '.html';
      } else {
        templateName = 'plugins/plugin-detail/templates/common/default-list-objects.html';
      }

      scope.objects = scope.data;
      scope.count = scope.objects.length;

      pluginDetailService.compileTemplate(scope, element, templateName);

    }
  }
})();