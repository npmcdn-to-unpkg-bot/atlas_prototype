(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('dpPluginDetailVisuals', dpPluginDetailVisualsDirective);

  function dpPluginDetailVisualsDirective () {
    return {
      restrict: 'E',
      scope: {
        apiData: '=',
        hasStraatbeeld: '='
      },
      templateUrl: 'plugins/plugin-detail/plugin-detail-visuals/plugin-detail-visuals.html',
      controller: DpPluginDetailVisualsController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  DpPluginDetailVisualsController.$inject = ['$stateParams', 'L', 'URIParser', 'crsService', 'geometryService'];

  function DpPluginDetailVisualsController ($stateParams, L, URIParser, crsService, geometryService) {
    var vm = this,
      highlightUri;

    highlightUri = URIParser.parseUri(vm.apiData._links.self.href).parsed_api_uri;
    geometryService.getByUri(highlightUri).then(setGeoJson);

    vm.mapStateTopo = {
      baseLayer: 'topografie',
      selection: highlightUri,
      overlays: []
    };

    vm.mapStateLufo = {
      baseLayer: 'luchtfoto_2015',
      selection: highlightUri,
      overlays: []
    };

    function setGeoJson (geoJson) {
      var layer,
        center;

      geoJson.crs = crsService.getRdObject();

      layer = L.Proj.geoJson(geoJson);
      center = layer.getBounds().getCenter();

      //Straatbeeld
      vm.coordinates = [center.lat, center.lng];
      vm.uri = $stateParams.uri;
    }
  }
})();
