/*                                                                          *
 * <share-and-extras/> This directive will add a linkbutton to the element. *
 *                                                                          *
 * When clicked on the element a menu will be activated                     *
 * Attributes:                                                              *
 * menu-items: print,save,measure,share                                     *
 *                                                                          */
(function () {
  'use strict';

  angular
    .module('atlasHeader')
    .directive('atlasHeaderMenu', atlasHeaderMenu);

  atlasHeaderMenu.$inject = ['$document'];

  function atlasHeaderMenu($document) {
    var directive = {
      bindToController: true,
      controller: AtlasHeaderMenuController,
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      scope: {
        menuItems: '=',
        page: '@'
      },
      replace: true,
      templateUrl: 'modules/header/components/menu/menu.html'
    };
    return directive;

    function link(scope, element, attrs, AtlasHeaderMenuController) {
      element.addClass(AtlasHeaderMenuController.page);

      $document.on('click', onClick);
      scope.$on('$destroy', onDestroy);

      function onClick(evt) {
        if(angular.isObject(evt.target.className) || evt.target.className.indexOf('js-menu') === -1) {
          AtlasHeaderMenuController.visible = false;
          scope.$digest();
        }
      }

      function onDestroy( ) {
        $document.off('click', onClick);
      }
    }
  }

  AtlasHeaderMenuController.$inject = ['$scope', '_'];

  function AtlasHeaderMenuController($scope, _) {
    var vm = this;
    var handler = null;

    vm.checkVisibility = checkVisibility;
    vm.toggleVisibility = toggleVisibility;
    vm.passedMenuItems = [];
    vm.visible = false;
    vm.position = {};

    init();

    function init() {
      if(!angular.isUndefined(vm.menuItems)) {
        vm.passedMenuItems = vm.menuItems.split(',');
      }

      // Temporary solution for the detailview.
      handler = $scope.$on('closeMenu', closeMenu);
      $scope.$on('$destroy', onDestroy);
    }

    function closeMenu() {
      vm.visible =  false;
    }

    function onDestroy() {
      //$scope.off('close', closeMenu);
      handler();
    }

    function toggleVisibility(evt) {
      evt.stopPropagation();
      vm.visible = !vm.visible;
    }

    function checkVisibility(type) {
      return (_.indexOf(vm.passedMenuItems, type) !== -1);
    }
  }

})();

