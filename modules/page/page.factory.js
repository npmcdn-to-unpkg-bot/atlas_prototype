(function () {
    'use strict';

    angular
        .module('atlasPage')
        .factory('Page', PageFactory);

    function PageFactory () {
        return {
            initialize: initialize,
            show: show
        };

        function initialize (HTMLElement, root) {
        }

        function show (page) {
        }
    }
})();