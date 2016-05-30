(function () {
    angular
        .module('atlas')
        .config(configuration);

    configuration.$inject = ['$provide'];

    function configuration ($provide) {
        $provide.constant('DEFAULT_STATE', {
            map: {
                width: 'wide', //alternatief is small
                baseLayer: 'topografie',
                overlays: ['meetbouten'],
                mapViewCenter: [52.123, 4.789],
                zoom: 12,
                isLoading: false,
                highlight: 'ijburg' //Dit kan een punt of geomterie zijn ala pand, stadsdeel
            },
            search: {
                query: null,
                location: [],
                isLoading: false
            },
            page: 'welcome',
            detail: {
                uri: 'bag/verblijfsobject/123',
                isLoading: false
            },
            straatbeeld: {
                id: 1234,
                location: [543, 123], //plek van de auto die de fotos maakt
                heading: 0,
                pitch: 0.5,
                fov: 90,
                isLoading: false
            }
        });

        //Als er een detail is
    }
})();