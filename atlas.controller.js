(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('AtlasController', AtlasController);

    AtlasController.$inject = ['store'];

    function AtlasController (store) {
        var vm = this,
            state;

        state = store.getState();

        vm.showPage = angular.isString(state.page);
        vm.showDetail = angular.isString(state.detail);
        vm.showStraatbeeld = angular.isObject(state.straatbeeld);
        vm.showSearchResults = angular.isString(state.search.query) || angular.isArray(state.search.location);
    }
})();