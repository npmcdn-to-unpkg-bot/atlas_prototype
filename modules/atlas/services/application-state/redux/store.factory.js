(function () {
    angular
        .module('atlas')
        .factory('store', storeFactory);

    storeFactory.$inject = ['Redux', 'reducer', 'DEFAULT_STATE'];

    function storeFactory (Redux, reducer, DEFAULT_STATE) {
        return Redux.createStore(reducer, DEFAULT_STATE);
    }
})();