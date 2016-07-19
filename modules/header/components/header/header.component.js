(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .component('atlasHeader', {
            bindings: {
                query: '@'
            },
            templateUrl: 'modules/header/components/header/header.html',
            controller: AtlasHeaderController,
            controllerAs: 'vm'
        });

    AtlasHeaderController.$inject = ['store', 'ACTIONS', 'userService'];

    function AtlasHeaderController (store, ACTIONS, userService) {
        var vm = this;
        vm.userService = userService;

        vm.showPage = function (name) {
            store.dispatch({
                type: ACTIONS.SHOW_PAGE,
                payload: name
            });
        };
    }
})();


