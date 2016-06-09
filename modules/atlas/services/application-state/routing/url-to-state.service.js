(function () {
    'use strict';

    angular
        .module('atlas')
        .service('urlToState', urlToStateService);

    urlToStateService.$inject = ['$rootScope', '$location', 'store'];

    function urlToStateService ($rootScope, $location, store) {
        return {
            initialize: initialize
        };

        function initialize () {
            $rootScope.$watch(function () {
                return $location.absUrl();
            }, function () {
                store.dispatch({
                    type: 'URL_CHANGED',
                    params: $location.search()
                });
            });
        }
    }
})();