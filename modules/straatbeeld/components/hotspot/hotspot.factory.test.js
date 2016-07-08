xdescribe('The hotspotService', function () {
    var $rootScope,
        hotspotService;

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            function ($provide) {
                $provide.factory('dpHotspotDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject(function (_$rootScope_, _hotspotService_) {
            $rootScope = _$rootScope_;
            hotspotService = _hotspotService_;
        });
    });

    it('creates hotspot HTML', function () {
        hotspotService.createHotspot(789, 15).then(function (template) {
            var html = template.outerHTML;

            expect(html).toContain('<dp-hotspot scene-id="789" distance="15"');
        });

        $rootScope.$apply();
    });

    it('calculates the location of the hotspot', function () {
        var absolutePosition,
            panoramaState,
            hotspot;

        panoramaState = {
            carOrientation: {
                heading: 2,
                pitch: 0.5
            }
        };

        hotspot = {
            relativeLocation: {
                yaw: 0.5,
                pitch: 0.1
            }
        };

        absolutePosition = hotspotService.calculateHotspotPosition(panoramaState, hotspot);

        expect(absolutePosition.yaw).toBe(-1.5);
        expect(absolutePosition.pitch).toBe(0.6);
    });
});
