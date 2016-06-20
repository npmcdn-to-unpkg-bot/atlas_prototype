(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('dpPluginDetailPano', dpPluginDetailPanoDirective);

  function dpPluginDetailPanoDirective () {
    return {
      restrict: 'E',
      scope: {
        coordinates: '=',
        uri: '@'
      },
      templateUrl: 'plugins/plugin-detail/plugin-detail-visuals/plugin-detail-pano/plugin-detail-pano.html',
      controller: DpPluginDetailPanoController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  DpPluginDetailPanoController.$inject = ['urls'];

  function DpPluginDetailPanoController (urls) {
    var vm = this,
      latitude,
      longitude;

    latitude = vm.coordinates[0];
    longitude = vm.coordinates[1];

    vm.linkParams = {
      plat: latitude,
      plon: longitude,
      uri: vm.uri
    };

    vm.imageUrl = urls.PANO_VIEW_PROXY +
      '?lat=' + latitude +
      '&lon=' + longitude +
      '&width=240&height=144';
  }
})();
