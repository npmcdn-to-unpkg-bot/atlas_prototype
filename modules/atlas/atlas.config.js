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
                zoom: 9,
                highlight: null,
                showLayerSelection: false,
                isLoading: false
            },
            search: null,
            /*
            search: {
                query: 'linnaeus',
                location: [52.123, 4.789]
            }
            */
            page: 'welkom',
            detail: null,
            /*
            detail: {
                uri: 'bag/verblijfsobject/123/',
                isLoading: false
            }
            */
            straatbeeld: null
            /*
            straatbeeld: {
                id: 1,
                searchLocation: null,
                date: null,
                camera: {
                    location: [52.789, 4.123],
                    heading: 20,
                    pitch: 0.1,
                    fov: 80
                },
                hotspots: [],
                isLoading: false
            }
            */
        });
    }
})();
