(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('dpPluginDetailList', dpPluginDetailListDirective);

  dpPluginDetailListDirective.$inject = ['pluginDetailService', 'dataService', 'URIParser'];

  function dpPluginDetailListDirective (pluginDetailService, dataService, URIParser) {
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
        'aantekening': 'plugins/plugin-detail/templates/common/aantekening.html',
        'adressen_lijst': 'plugins/plugin-detail/templates/common/adressen_lijst.html',
        'brk': 'plugins/plugin-detail/templates/common/brk.html',
        'brk-vbo': 'plugins/plugin-detail/templates/bag/includes/brk-vbo.html',
        'rechten': 'plugins/plugin-detail/templates/common/rechten.html'
      };

      if (scope.page) {
        templateName = templates[scope.page] || templatePath + '/includes/' + scope.page +
          (scope.page.indexOf('.html') === -1 ? '.html' : '');
      } else {
        templateName = 'plugins/plugin-detail/templates/common/default-list-objects.html';
      }

      dataService.getApiData(scope.href).then(function (response) {
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

        dataService.getApiData(scope.next).then(function (response) {
          scope.next = response._links.next.href;
          scope.objects.push.apply(scope.objects, response.results);  // push results to end of scope.objects
        });
      };
    }
  }
})();
