(function () {
    'use strict';

    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = ['fakeApi'];

    function runBlock (fakeApi) {
        fakeApi.initialize();
    }
})();