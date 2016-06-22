(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('StraatbeeldController', StraatbeeldController);

    StraatbeeldController.$inject = ['applicationState'];

    function StraatbeeldController (applicationState) {
        var vm = this;

        vm.store = applicationState.getStore();

        vm.store.subscribe(update);
        update();

        function update () {
            var state = vm.store.getState();

            vm.id = state.straatbeeld && state.straatbeeld.id;
            vm.camera = state.straatbeeld && state.straatbeeld.camera;
            vm.isLoading = state.straatbeeld && state.straatbeeld.isLoading;
        }
    }
})();