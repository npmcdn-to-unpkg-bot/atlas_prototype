(function () {
    'use strict';

    angular
        .module('atlasHeader')
        .factory('Header', HeaderFactory);

    function HeaderFactory () {
        return {
            initialize: initialize
        };

        function initialize (HTMLElement, store) {
            console.log('initialize', HTMLElement, store);

            return {
                setQuery: function (query) {
                    console.log('setQuery', query);
                }
            };
        }
    }
})();