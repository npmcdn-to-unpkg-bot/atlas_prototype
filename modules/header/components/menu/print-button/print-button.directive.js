(function () {
  'use strict';

  angular
    .module('atlasHeader')
    .directive('dpPrintButton', dpPrintButtonDirective);

  function dpPrintButtonDirective () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/header/components/menu/print-button/print-button.html',
      controller: DpPrintButtonController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  DpPrintButtonController.$inject = ['$window'];

  function DpPrintButtonController ($window) {
    var vm = this;

    vm.print = function () {
      $window.print();
    };
  }
})();
