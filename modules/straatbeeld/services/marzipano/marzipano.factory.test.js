describe('The marzipanoService factory', function () {
    var $rootScope,
        Marzipano,
        marzipanoService,
        earthmine,
        fakeView,
        fakeCubeGeometery,
        fakeViewer,
        fakeScene;

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            {
                straatbeeldConfig: {
                    MAX_RESOLUTION: 1000,
                    MAX_FOV: 100,
                    RESOLUTION_LEVELS: 'FAKE_RESOLUTION_LEVELS'
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

        angular.mock.inject(
            function (_$rootScope_, _Marzipano_, _marzipanoService_, _earthmine_) {
                $rootScope = _$rootScope_;
                Marzipano = _Marzipano_;
                marzipanoService = _marzipanoService_;
                earthmine = _earthmine_;
            }
        );

        fakeView = {
            someThing: 4
        };

        fakeCubeGeometery = {
            whatever: 'some data'
        };

        fakeViewer = {
            createScene: function () {}
        };

        fakeScene = {
            switchTo: function () {}
        };

        spyOn(Marzipano, 'Viewer').and.returnValue(fakeViewer);
        spyOn(earthmine, 'getImageSourceUrl').and.callThrough();
        spyOn(Marzipano.RectilinearView.limit, 'traditional').and.returnValue('FAKE_VIEW_LIMITER');
        spyOn(Marzipano, 'RectilinearView').and.returnValue(fakeView);
        spyOn(Marzipano.ImageUrlSource, 'fromString').and.returnValue('FAKE_IMAGE_URL_SOURCE');
        spyOn(Marzipano, 'CubeGeometry').and.returnValue(fakeCubeGeometery);
        spyOn(fakeViewer, 'createScene').and.returnValue(fakeScene);
        spyOn(fakeScene, 'switchTo');
    });

    it('creates a Marzipano viewer instance when initializing', function () {
        var fakeDomElement;

        fakeDomElement = document.createElement('div');
        marzipanoService.initialize(fakeDomElement);

        expect(Marzipano.Viewer).toHaveBeenCalledWith(fakeDomElement);
    });

    describe('it has a loadScene function', function () {
        beforeEach(function () {
            var domElement = document.createElement('div');

            marzipanoService.initialize(domElement);
        });

        it('that, ehm, loads a scene', function () {
            marzipanoService.loadScene(54321);

            expect(earthmine.getImageSourceUrl).toHaveBeenCalledWith(54321);

            expect(Marzipano.RectilinearView.limit.traditional).toHaveBeenCalledWith(1000, 50);
            expect(Marzipano.RectilinearView).toHaveBeenCalledWith({}, 'FAKE_VIEW_LIMITER');
            expect(Marzipano.ImageUrlSource.fromString).toHaveBeenCalledWith('http://www.image-source-url.com/54321');
            expect(Marzipano.CubeGeometry).toHaveBeenCalledWith('FAKE_RESOLUTION_LEVELS');

            expect(fakeViewer.createScene).toHaveBeenCalledWith({
                source: 'FAKE_IMAGE_URL_SOURCE',
                geometry: fakeCubeGeometery,
                view: fakeView,
                pinFirstLevel: true
            });

            expect(fakeScene.switchTo).toHaveBeenCalled();
        });
    });
});
