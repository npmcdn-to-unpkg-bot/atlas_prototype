(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('pageReducers', pageReducersFactory);

    pageReducersFactory.$inject = ['ACTIONS'];

    function pageReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.SHOW_PAGE] = showPageReducer;

        return reducers;

        function showPageReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.page = payload;

            newState.map.highlight = null;
            newState.map.showLayerSelection = false;
            newState.search = null;
            newState.detail = null;
            newState.staatbeeld = null;

            return newState;
        }
    }
})();

