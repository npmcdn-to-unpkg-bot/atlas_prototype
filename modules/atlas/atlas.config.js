(function () {
    angular
        .module('atlas')
        .config(configuration);

    configuration.$inject = ['$provide'];

    function configuration ($provide) {
        $provide.constant('DEFAULT_STATE', {
            map: {
                baseLayer: 'topografie',
                overlays: [],
                viewCenter: [52.3719, 4.9012],
                zoom: 12,
                highlight: null,
                showLayerSelection: false,
                isLoading: false
            },
            search: null,
            page: 'welcome',
            detail: null,
            straatbeeld: null
        });
    }
})();