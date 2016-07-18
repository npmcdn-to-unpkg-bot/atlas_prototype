(function () {
    angular
        .module('dpMap')
        .run(runBlock);

    runBlock.$inject = ['highlight'];

    function runBlock (highlight) {
        highlight.initialize();
    }
})();