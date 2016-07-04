(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('atlasWkpbLink', atlasWkpbLinkDirective);



  function atlasWkpbLinkDirective() {
    return {
      restrict: 'E',
      scope: {
        brkObject: '='
      },
      templateUrl: 'modules/detail/components/wkpb-link/wkpb-link.html',
      controller: AtlasWkpbLinkController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  AtlasWkpbLinkController.$inject = ['environment'];

  function AtlasWkpbLinkController (environment) {
    var vm = this;

    vm.wkpbUri = environment.API_ROOT + 'brk/object-wkpb/' + vm.brkObject.id;
  }
})();