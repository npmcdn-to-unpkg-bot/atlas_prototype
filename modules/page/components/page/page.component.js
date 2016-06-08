(function () {
    'use strict';

    angular
        .module('atlasPage')
        .component('atlasPage', {
            bindings: {
                name: '@',
                store: '='
            },
            templateUrl: 'modules/page/components/page/page.html',
            controller: AtlasPageController,
            controllerAs: 'vm'
        });

    AtlasPageController.$inject = [];

    function AtlasPageController () {
    }
})();
