xdescribe('The dp-panorama directive', function () {
    var $compile,
        $rootScope,
        marzipanoService,
        mockedPanoramaViewer = {
            stuff: 'something'
        },
        mockedPanoramaState = {
            location: {
                latitude: 52.123,
                longitude: 4.789
            },
            whatever: 'irrelevant'
        };

    beforeEach(function () {
        angular.mock.module('dpStraatbeeld');

        angular.mock.inject(function (_$compile_, _$rootScope_, _marzipanoService_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            marzipanoService = _marzipanoService_;
        });

        spyOn(marzipanoService, 'initialize').and.returnValue(mockedPanoramaViewer);
        spyOn(marzipanoService, 'loadScene');
    });

    function getDirective (id, searchLocation, isLoading) {
        var directive,
            element,
            scope;

        element = document.createElement('dp-panorama');
        element.setAttribute('id', 'id');
        element.setAttribute('location', 'location');
        element.setAttribute('is-loading', 'isLoading');

        scope = $rootScope.$new();
        scope.id = id;
        scope.searchLocation = searchLocation;
        scope.isLoading = isLoading;

        directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('initializes the marzipanoService with the panoramaState', function () {
        var directive,
            container;

        directive = getDirective(mockedPanoramaState);
        container = directive.html.find('.js-marzipano-viewer')[0];

        expect(marzipanoService.initialize).toHaveBeenCalledWith(container);
        expect(marzipanoService.loadScene).toHaveBeenCalledWith(mockedPanoramaState);

        //It's doesn't load a scene on initialisation
    });

    it('loads new Earthmine data when the ID or searchLocation changes', function () {

    });

    it('loads a scene when the camera location changes', function () {

    });
});
