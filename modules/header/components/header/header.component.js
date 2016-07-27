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

    AtlasHeaderController.$inject = ['user'];

    function AtlasHeaderController (user) {
        var vm = this;

        vm.isLoggedIn = function () {
            return user.getStatus().isLoggedIn;
        };

        vm.getUsername = function () {
            return user.getStatus().username;
        };

        vm.logout = user.logout;
    }
})();


