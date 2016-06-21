(function () {
    angular
        .module('atlas')
        .factory('store', storeFactory);

    storeFactory.$inject = ['Redux', 'reducer', 'stateToUrlMiddleware', 'DEFAULT_STATE'];

    function storeFactory (Redux, reducer, stateToUrlMiddleware, DEFAULT_STATE) {
        var enhancer = Redux.applyMiddleware(stateToUrlMiddleware);

        return Redux.createStore(reducer, DEFAULT_STATE, enhancer);
    }
})();