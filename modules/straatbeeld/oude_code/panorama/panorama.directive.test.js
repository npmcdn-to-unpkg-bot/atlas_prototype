xdescribe('The dp-panorama directive', function () {
    var $compile,
        $rootScope,
        marzipanoService,
        panoramaOrientation,
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
        angular.mock.module(
            'atlasApp',
            'atlasApp.straatbeeld',
            function ($provide) {
                $provide.factory('dpPanoramaMinimapDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _marzipanoService_, _panoramaOrientation_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            marzipanoService = _marzipanoService_;
            panoramaOrientation = _panoramaOrientation_;
        });

        spyOn(marzipanoService, 'initialize').and.returnValue(mockedPanoramaViewer);
        spyOn(marzipanoService, 'loadScene');
    });

    function getDirective (panoramaState) {
        var directive,
            element,
            scope;

        element = document.createElement('dp-panorama');
        element.setAttribute('panorama-state', 'panoramaState');

        scope = $rootScope.$new();
        scope.panoramaState = panoramaState;

        directive = $compile(element)(scope);
        scope.$apply();

        return {
            html: directive,
            scope: directive.isolateScope()
        };
    }

    it('initializes the marzipanoService with the panoramaState, then loads the scene', function () {
        var directive,
            container;

        directive = getDirective(mockedPanoramaState);
        container = directive.html.find('.js-marzipano-viewer')[0];

        expect(marzipanoService.initialize).toHaveBeenCalledWith(container);
        expect(marzipanoService.loadScene).toHaveBeenCalledWith(mockedPanoramaState);
    });

    it('adds the panoramaViewer to the scope', function () {
        var directive;

        directive = getDirective(mockedPanoramaState);

        expect(directive.scope.panoramaViewer).toEqual(mockedPanoramaViewer);
    });

    it('calls the panorama orientation service on mousemove', function () {
        var directive;

        directive = getDirective(mockedPanoramaState);

        expect(directive.html.find('.js-marzipano-viewer[ng-mousemove="updateOrientation()"]').length).toBe(1);

        spyOn(panoramaOrientation, 'update');
        directive.scope.updateOrientation();

        expect(panoramaOrientation.update).toHaveBeenCalledWith(mockedPanoramaViewer, mockedPanoramaState);
    });
});
