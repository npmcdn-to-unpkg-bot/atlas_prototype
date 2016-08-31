(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('dataSelectionReducers', dataSelectionReducersFactory);

    dataSelectionReducersFactory.$inject = ['ACTIONS'];

    function dataSelectionReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.SHOW_DATA_SELECTION] = showDataSelectionReducer;
        reducers[ACTIONS.NAVIGATE_DATA_SELECTION] = navigateDataSelectionReducer;

        return reducers;

        /**
         * @param {Object} oldState
         * @param {Object} payload - On object with two keys: dataset (String) and activeFilters (Object)
         *
         * @returns {Object} newState
         */
        function showDataSelectionReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.dataSelection = payload;
            newState.dataSelection.page = 1;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Number} payload - The destination page
         *
         * @returns {Object} newState
         */
        function navigateDataSelectionReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.dataSelection.page = payload;

            return newState;
        }
    }
})();