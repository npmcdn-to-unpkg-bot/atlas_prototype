(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .factory('Detail', DetailFactory);

    function DetailFactory () {
        return {
            initialize: initialize,
            setUri: setUri,
            setLoadingIndicator: setLoadingIndicator
        };

        function initialize () {
            //HTMLElement, store
        }

        function setUri () {
            //uri
        }

        function setLoadingIndicator () {
            //isLoading
        }
    }
})();