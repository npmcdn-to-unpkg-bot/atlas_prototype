(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = [
        'detailReducers',
        'layerSelectionReducers',
        'mapReducers',
        'pageReducers',
        'searchReducers',
        'straatbeeldReducers'
    ];

    function reducerFactory (detailReducers,
        layerSelectionReducers,
        mapReducers,
        pageReducers,
        searchReducers,
        straatbeeldReducers) {

        return function (oldState, action) {
            var actions = angular.merge(
                detailReducers,
                layerSelectionReducers,
                mapReducers,
                pageReducers,
                searchReducers,
                straatbeeldReducers
            );

            if (angular.isDefined(action) && angular.isDefined(actions[action.type])) {
                return actions[action.type](oldState, action.payload);
            } else {
                return oldState;
            }
        };
    }
})();