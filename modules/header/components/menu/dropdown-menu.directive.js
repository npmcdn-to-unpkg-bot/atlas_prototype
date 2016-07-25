(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .component('atlasDropdownMenu', {
            bindings: {
                label: '@',
            },
            transclude: true,
            templateUrl:'modules/header/components/menu/dropdown-menu.html',
            controller: AtlasDropdownMenuController,
            controllerAs: 'vm',
        });

    AtlasDropdownMenuController.$inject = [];

    function AtlasDropdownMenuController() {
        var vm = this;
            vm.isVisible = false;


    }

})();