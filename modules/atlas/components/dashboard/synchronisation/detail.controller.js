(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('AtlasDetailController', AtlasDetailController);

    AtlasDetailController.$inject = ['store'];

    function AtlasDetailController (store) {
        var vm = this;

        vm.store = store;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState();

            vm.uri = state.detail && state.detail.uri;
            vm.isLoading = state.detail && state.detail.isLoading;
        }
    }
})();