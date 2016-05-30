(function () {
    angular
        .module('atlas')
        .factory('store', storeFactory);

    storeFactory.$inject = ['Redux', 'DEFAULT_STATE', 'urlMiddleware', 'reducer'];

    function storeFactory (Redux, DEFAULT_STATE, urlMiddleware, reducer) {
        var store,
            enhancer;

        enhancer = Redux.applyMiddleware(urlMiddleware);
        store = Redux.createStore(reducer, DEFAULT_STATE, enhancer);

        return store;
    }
})();