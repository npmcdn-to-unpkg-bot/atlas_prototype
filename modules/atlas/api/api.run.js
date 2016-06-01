(function () {
    'use strict';

    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = ['api'];

    function runBlock (api) {
        api.initialize();
    }
})();