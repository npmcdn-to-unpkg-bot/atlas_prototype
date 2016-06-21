(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('dpPluginDetailPartial', dpPluginDetailPartialDirective);

  dpPluginDetailPartialDirective.$inject = ['pluginDetailService', 'dataService', 'URIParser'];

  /*
   * @description Directive to render a reuseable partial in the include directory of where the template is located
   *
   * @example
   * <plugin-detail-partial page="'adres.html'" object="controller.api_data.woonadres"></plugin-detail-partial>
   *
   * @example
   * <plugin-detail-partial page="'woonplaats.html'" href="controller.api_data.woonplaats"></plugin-detail-partial>
   */
  function dpPluginDetailPartialDirective (pluginDetailService, dataService, URIParser) {
    return {
      restrict: 'E',
      scope: {
        object: '=',
        href: '=',
        page: '=',
        includes: '='
      },
      link: linkFunction
    };

    function linkFunction (scope, element) {
      if (!scope.page) {
        return;
      }

      var isInclude = !(scope.includes && scope.includes === 'no');

      // object passed to directive?
      if (scope.hasOwnProperty('object') && scope.object !== false) {
        scope.$watch('object', function (newVal, oldVal) {
          if (newVal || oldVal) {
            var object = newVal || oldVal;

            if (isInclude) {
              scope.object = object;
            } else {
              // a normal template that expects data from a controller
              scope.controller = scope.controller || {};
              scope.controller.api_data = object;
            }

            var templatePath = 'plugins/plugin-detail/templates/' +
              URIParser.parseUri(object._links.self.href).dataset;
            var templateName = isInclude ? templatePath + '/includes/' +
            scope.page : templatePath + '/' + scope.page;

            pluginDetailService.compileTemplate(scope, element, templateName);
          }
        });
        return;
      }

      // fetch object mode, no href, return
      if (!scope.hasOwnProperty('href')) {
        return;
      }

      // wait for it to be available
      scope.$watch('href', function (newVal) {
        if (newVal) {
          dataService.getApiData(newVal).then(function (response) {
            // include templates expect the data to be located in 'object'
            if (response.count === 1) {
              response = response.results[0];
            }
            if (isInclude) {
              scope.object = response;
            } else {
              // a normal template that expects data from a controller
              scope.controller = scope.controller || {};
              scope.controller.api_data = response;
            }

            var templatePath = 'plugins/plugin-detail/templates/' + URIParser.parseUri(newVal).dataset;

            var templateName = isInclude ? templatePath + '/includes/' + scope.page
              : templatePath + '/' + scope.page;

            pluginDetailService.compileTemplate(scope, element, templateName);
          });
        }
      });
    }
  }
})();
