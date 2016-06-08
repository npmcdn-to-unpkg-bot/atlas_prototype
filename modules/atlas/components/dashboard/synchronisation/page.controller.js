(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('AtlasPageController', AtlasPageController);

    AtlasPageController.$inject = ['store'];

    function AtlasPageController (store) {
        var vm = this;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState();

            vm.pageName = state.page;
        }
    }
})();