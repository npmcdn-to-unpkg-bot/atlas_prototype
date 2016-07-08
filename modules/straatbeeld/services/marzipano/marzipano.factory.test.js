xdescribe('The marzipanoService', function () {
    var $state,
        $q,
        $rootScope,
        Marzipano,
        marzipanoService,
        hotspotService,
        fakePanoramaState,
        fakeViewer,
        fakeScene,
        fakeView,
        fakeViewLimiter,
        fakeImageUrlSource,
        fakeCubeGeometery,
        fakeHotspotPosition,
        fakeHotspotTemplatePromise,
        fakeHotspotContainer;

    beforeEach(function () {
        angular.mock.module('atlasApp');

        angular.mock.module(
            'atlasApp.straatbeeld',
            {
                straatbeeldConfig: {
                    MAX_RESOLUTION: 1000,
                    MAX_FOV: 100,
                    RESOLUTION_LEVELS: 'thisIsADummyValueForResolutionLevels',
                    HOTSPOT_PERSPECTIVE: 'thisIsADummyValueForHotspotPerspective'
                },
                angleConversion: {
                    degreesToRadians: function (input) {
                        return input / 2;
                    }
                },
                earthmine: {
                    getImageSourceUrl: function (sceneId) {
                        return 'http://www.image-source-url.com/' + sceneId;
                    }
                }
            }
        );

        angular.mock.inject(function (_$state_, _$q_, _$rootScope_, _Marzipano_, _marzipanoService_, _hotspotService_) {
            $state = _$state_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            Marzipano = _Marzipano_;
            marzipanoService = _marzipanoService_;
            hotspotService = _hotspotService_;
        });

        fakePanoramaState = {
            id: 12345,
            carOrientation: {
                heading: 0.5,
                pitch: 0.1
            },
            cameraOrientation: {
                heading: 1,
                pitch: 0.1
            },
            hotspots: []
        };

        fakeViewer = {
            createScene: function () {}
        };

        fakeScene = {
            switchTo: function () {},
            hotspotContainer: {}
        };

        fakeView = {
            setYaw: function () {},
            setPitch: function () {}
        };

        fakeHotspotPosition = {
            yaw: 2,
            pitch: 0.001
        };

        fakeViewLimiter = {};
        fakeImageUrlSource = {};
        fakeCubeGeometery = {};
        fakeHotspotContainer = {
            createHotspot: function () {}
        };

        fakeHotspotTemplatePromise = getFakeHotSpotTemplate();

        spyOn(Marzipano, 'Viewer').and.returnValue(fakeViewer);
        spyOn(fakeViewer, 'createScene').and.returnValue(fakeScene);

        spyOn(Marzipano.RectilinearView.limit, 'traditional').and.returnValue(fakeViewLimiter);
        spyOn(Marzipano, 'RectilinearView').and.returnValue(fakeView);
        spyOn(Marzipano.ImageUrlSource, 'fromString').and.returnValue(fakeImageUrlSource);
        spyOn(Marzipano, 'CubeGeometry').and.returnValue(fakeCubeGeometery);
        spyOn(fakeScene, 'switchTo');
        spyOn(fakeView, 'setYaw');
        spyOn(fakeView, 'setPitch');

        spyOn(hotspotService, 'calculateHotspotPosition').and.returnValue(fakeHotspotPosition);
        spyOn(hotspotService, 'createHotspot').and.returnValue(fakeHotspotTemplatePromise);

        spyOn(fakeScene, 'hotspotContainer').and.returnValue(fakeHotspotContainer);
        spyOn(fakeHotspotContainer, 'createHotspot');
    });

    function getFakeHotSpotTemplate () {
        var q = $q.defer();

        q.resolve('<p>I am a fake template</p>');

        return q.promise;
    }

    it('creates and returns a Marzipano viewer instance when initializing', function () {
        var fakeDomElement,
            returnValue;

        fakeDomElement = document.createElement('div');
        returnValue = marzipanoService.initialize(fakeDomElement);

        expect(Marzipano.Viewer).toHaveBeenCalledWith(fakeDomElement);
        expect(returnValue).toBe(fakeViewer);
    });

    describe('it has a loadScene function', function () {
        beforeEach(function () {
            var domElement = document.createElement('div');

            marzipanoService.initialize(domElement);
        });

        it('that, ehm, loads a scene', function () {
            marzipanoService.loadScene(fakePanoramaState);

            expect(Marzipano.RectilinearView.limit.traditional).toHaveBeenCalledWith(1000, 50);
            expect(Marzipano.RectilinearView).toHaveBeenCalledWith(fakePanoramaState.carOrientation, fakeViewLimiter);
            expect(Marzipano.ImageUrlSource.fromString).toHaveBeenCalledWith('http://www.image-source-url.com/12345');
            expect(Marzipano.CubeGeometry).toHaveBeenCalledWith('thisIsADummyValueForResolutionLevels');

            expect(fakeViewer.createScene).toHaveBeenCalledWith({
                source: fakeImageUrlSource,
                geometry: fakeCubeGeometery,
                view: fakeView,
                pinFirstLevel: true
            });

            expect(fakeScene.switchTo).toHaveBeenCalled();
        });

        it('either uses the default orientation from earthmine', function () {
            delete fakePanoramaState.cameraOrientation.heading;
            delete fakePanoramaState.cameraOrientation.pitch;

            marzipanoService.loadScene(fakePanoramaState);

            expect(Marzipano.RectilinearView).toHaveBeenCalledWith(fakePanoramaState.carOrientation, fakeViewLimiter);
            expect(fakeView.setYaw).not.toHaveBeenCalled();
            expect(fakeView.setPitch).not.toHaveBeenCalled();
        });

        it('or it uses the camera orientation from the panoramaState', function () {
            marzipanoService.loadScene(fakePanoramaState);

            expect(Marzipano.RectilinearView).toHaveBeenCalledWith(fakePanoramaState.carOrientation, fakeViewLimiter);
            expect(fakeView.setYaw).toHaveBeenCalledWith(0.5);
            expect(fakeView.setPitch).toHaveBeenCalledWith(0.1);
        });

        it('updates the URL without triggering a state change', function () {
            spyOn($state, 'go');

            marzipanoService.loadScene(fakePanoramaState);

            expect($state.go).toHaveBeenCalledWith(
                'app.straatbeeld',
                {
                    id: 12345,
                    plat: null,
                    plon: null
                }, {
                    location: 'replace',
                    notify: false
                }
            );
        });

        it('adds hotspots', function () {
            fakePanoramaState.hotspots = [{
                id: 6,
                relativeLocation: {
                    distance: 20
                }
            }];

            marzipanoService.loadScene(fakePanoramaState);
            $rootScope.$apply(); //This resolves the hotspotService.createHotspot promise

            expect(hotspotService.createHotspot).toHaveBeenCalledWith(6, 20, fakePanoramaState);

            expect(fakeHotspotContainer.createHotspot).toHaveBeenCalledWith(
                '<p>I am a fake template</p>',
                fakeHotspotPosition,
                'thisIsADummyValueForHotspotPerspective'
            );
        });
    });
});
