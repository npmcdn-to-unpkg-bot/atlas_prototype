(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('dpPluginDetailList', dpPluginDetailListDirective);

  dpPluginDetailListDirective.$inject = ['pluginDetailService', 'api', 'URIParser'];

  function dpPluginDetailListDirective (pluginDetailService, api, URIParser) {
    return {
      restrict: 'E',
      scope: {
        href: '=',
        page: '=',
        expand: '='
      },
      link: linkFunction
    };

    function linkFunction (scope, element) {
      if (!scope.href) {
        return;
      }


      if(scope.expand) {
        scope.href = scope.href.replace('brk/object', 'brk/object-expand');
      }

      var templatePath = 'plugins/plugin-detail/templates/' + URIParser.parseUri(scope.href).dataset;

      var templateName;

      var templates = {
        'aantekening': 'modules/detail/components/templates/common/aantekening.html',
        'adressen_lijst': 'modules/detail/components/templates/common/adressen_lijst.html',
        'brk': 'modules/detail/components/templates/common/brk.html',
        'brk-vbo': 'modules/detail/components/templates/bag/includes/brk-vbo.html',
        'rechten': 'modules/detail/components/templates/common/rechten.html'
      };

      if (scope.page) {
        templateName = templates[scope.page] || templatePath + '/includes/' + scope.page +
          (scope.page.indexOf('.html') === -1 ? '.html' : '');
      } else {
        templateName = 'modules/detail/components/templates/common/default-list-objects.html';
      }

      api.getByUri(scope.href).then(function (response) {
        if(response.results) { //VBO & nummeraanduiding
          scope.objects = response.results;
        } else if(response.id) { //KOT
          scope.object = response;
        }
        scope.count = response.count;
        if(response._links.next) {
          scope.next = response._links.next.href;
        }

        pluginDetailService.compileTemplate(scope, element, templateName);
      });

      scope.loadMore = function () {
        if (!scope.next) {
          return;
        }

        api.getByUri.getTemplateUrl(scope.next).then(function (response) {
          scope.next = response._links.next.href;
          scope.objects.push.apply(scope.objects, response.results);  // push results to end of scope.objects
        });
      };
    }
  }
})();
