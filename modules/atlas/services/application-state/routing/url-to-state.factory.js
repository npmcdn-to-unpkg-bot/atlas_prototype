/*
(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlToState', urlToStateFactory);

    urlToStateFactory.$inject = ['$rootScope', '$location', 'store'];

    function urlToStateFactory ($rootScope, $location, store) {
        return {
            initialize: initialize
        };

        function initialize () {
            $rootScope.$watch(function () {
                return $location.search();
            }, function () {
                store.dispatch({
                    type: 'URL_CHANGE',
                    payload: $location.search()
                });
            });
        }
    }
})();
*/