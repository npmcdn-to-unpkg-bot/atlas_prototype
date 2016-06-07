(function () {
    'use strict';

    angular
        .module('atlasLayerSelection')
        .factory('LayerSelection', LayerSelectionFactory);

    function LayerSelectionFactory () {
        return {
            initialize: initialize
        };

        function initialize () {
            //HTMLElement, store
        }
    }
})();