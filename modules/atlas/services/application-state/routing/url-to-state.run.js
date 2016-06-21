(function () {
    'use strict';

    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$location', 'store'];

    function runBlock ($rootScope, $location, store) {
        $rootScope.$watch(function () {
            return $location.search();
        }, function () {
            console.log('url_change afvuren', $location.search());
            store.dispatch({
                type: 'URL_CHANGE',
                payload: $location.search()
            });
        });
    }
})();
