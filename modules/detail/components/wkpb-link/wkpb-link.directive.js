(function () {
  'use strict';

  angular
    .module('atlasDetail')
    .directive('dpWkpbLink', dpWkpbLinkDirective);

  function dpWkpbLinkDirective() {
    return {
      restrict: 'E',
      scope: {
        brkObject: '='
      },
      templateUrl: 'modules/detail/components/wkpb-link/wkpb-link.html',
      controller: DpWkpbLinkController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function DpWkpbLinkController () {
    var vm = this;

    vm.wkpbUri = 'brk/object-wkpb/' + vm.brkObject.id;
  }
})();