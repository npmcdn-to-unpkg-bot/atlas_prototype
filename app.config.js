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
                highlight: null
            },
            search: {
                query: null,
                location: null,
                isLoading: false
            },
            page: 'welcome',
            detail: {
                uri: null,
                isLoading: false
            },
            straatbeeld: {
                id: null,
                cameraLocation: null,
                heading: null,
                pitch: null,
                fov: null,
                isLoading: false
            }
        });
    }
})();