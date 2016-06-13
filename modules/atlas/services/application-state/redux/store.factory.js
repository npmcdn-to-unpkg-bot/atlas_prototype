(function () {
    angular
        .module('atlas')
        .factory('store', storeFactory);

    storeFactory.$inject = ['Redux', 'DEFAULT_STATE', 'reducer', 'urlMiddleware'];

    function storeFactory (Redux, reducer, DEFAULT_STATE, urlMiddleware) {
        var enhancer = Redux.applyMiddleware(urlMiddleware);

        return Redux.createStore(reducer, DEFAULT_STATE, enhancer);
    }
})();