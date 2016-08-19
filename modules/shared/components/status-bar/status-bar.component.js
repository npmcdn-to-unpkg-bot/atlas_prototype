(function () {
    angular
        .module('dpShared')
        .component('dpStatusBar', {
            transclude: true,
            templateUrl: 'modules/shared/components/status-bar/status-bar.html'
        });
})();