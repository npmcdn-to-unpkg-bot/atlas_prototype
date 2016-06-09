(function () {
    angular
        .module('atlas')
        .factory('store', storeFactory);

    storeFactory.$inject = ['Redux', 'DEFAULT_STATE', 'reducer'];

    function storeFactory (Redux, DEFAULT_STATE, reducer) {
        return Redux.createStore(reducer, DEFAULT_STATE);
    }
})();