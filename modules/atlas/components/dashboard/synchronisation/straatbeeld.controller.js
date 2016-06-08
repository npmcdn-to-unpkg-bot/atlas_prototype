(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('StraatbeeldController', StraatbeeldController);

    StraatbeeldController.$inject = ['store'];

    function StraatbeeldController (store) {
        var vm = this;

        vm.store = store;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState();

            vm.id = state.straatbeeld && state.straatbeeld.id;
            vm.camera = state.straatbeeld && state.straatbeeld.camera;
            vm.isLoading = state.straatbeeld && state.straatbeeld.isLoading;
        }
    }
})();