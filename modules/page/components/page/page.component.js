(function () {
    'use strict';

    angular
        .module('atlasPage')
        .component('atlasPage', {
            bindings: {
                name: '@'
            },
            templateUrl: 'modules/page/components/page/page.html',
            controllerAs: 'vm'
        });
})();
