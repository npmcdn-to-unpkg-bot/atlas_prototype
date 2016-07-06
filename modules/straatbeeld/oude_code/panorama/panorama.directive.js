(function () {
  'use strict';

  angular
    .module('dpStraatbeeld')
    .directive('dpPanorama', dpPanoramaDirective);

  dpPanoramaDirective.$inject = ['marzipanoService', 'panoramaOrientation'];

  function dpPanoramaDirective (marzipanoService, panoramaOrientation) {
    return {
      restrict: 'E',
      scope: {
        panoramaState: '='
      },
      templateUrl: 'modules/straatbeeld/panorama/panorama.html',
      link: linkFunction
    };

    function linkFunction (scope, element) {
      var container;

      container = element[0].querySelector('.js-marzipano-viewer');

      scope.panoramaViewer = marzipanoService.initialize(container);
      marzipanoService.loadScene(scope.panoramaState);

      scope.updateOrientation = function () {
        panoramaOrientation.update(scope.panoramaViewer, scope.panoramaState);
      };
    }
  }
})();
