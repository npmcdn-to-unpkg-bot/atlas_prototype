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

    AtlasHeaderController.$inject = ['store', 'ACTIONS', 'user'];

    function AtlasHeaderController (store, ACTIONS, user) {
        var vm = this;

        vm.showPage = function (name) {
            store.dispatch({
                type: ACTIONS.SHOW_PAGE,
                payload: name
            });
        };

        vm.isLoggedIn = function () {
            return user.getStatus().isLoggedIn;
        };

        vm.getUsername = function () {
            return user.getStatus().username;
        };

        vm.logout = function () {
            user.logout().then(function () {
                console.log('jajajajajaja');
            });
        };
    }
})();


