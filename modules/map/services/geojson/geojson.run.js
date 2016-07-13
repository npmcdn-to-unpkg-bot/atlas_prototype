(function () {
    angular
        .module('dpMap')
        .run(runBlock);

    runBlock.$inject = ['geojson'];

    function runBlock (geojson) {
        geojson.initialize();
    }
})();