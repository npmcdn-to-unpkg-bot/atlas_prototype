(function () {
    angular
        .module('atlas')
        .factory('store', storeFactory);

    storeFactory.$inject = ['Redux', 'reducer', 'DEFAULT_STATE', 'stateToUrlMiddleware'];

    function storeFactory (Redux, reducer, DEFAULT_STATE, stateToUrlMiddleware) {
        var enhancer = Redux.applyMiddleware(stateToUrlMiddleware);

        return Redux.createStore(reducer, DEFAULT_STATE, enhancer);
    }
})();