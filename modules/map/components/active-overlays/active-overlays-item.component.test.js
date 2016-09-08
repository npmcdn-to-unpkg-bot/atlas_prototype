describe('The dp-active-overlays-item component', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            {
                mapConfig: {
                    OVERLAY_ROOT: 'http://atlas.example.com/overlays/'
                }
            },
            function ($provide) {
                $provide.constant('OVERLAYS', {
                    SOURCES: {
                        overlay_without_legend: {
                            minZoom: 8,
                            maxZoom: 10
                        },
                        overlay_with_internal_legend: {
                            minZoom: 10,
                            maxZoom: 14,
                            legend: 'blabla.png'
                        },
                        overlay_with_external_legend: {
                            minZoom: 12,
                            maxZoom: 16,
                            legend: 'http://not-atlas.example.com/blabla.png',
                            external: true
                        }
                    }
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent () {

    }

    it('shows uses the short label from the OVERLAYS config', function () {

    });

    it('has an optional legend image', function () {
        //No legend

        //A self-hosted legend

        //An externally hosted legend
    });

    it('shows a message for manually hidden overlays', function () {

    });

    it('shows a message for hidden overlays caused by the zoom level', function () {

    });

    it('won\'t show the hidden because of the zoom level message when the layer has been hidden manually', function () {

    });

    it('has a button to hide the overlay, even if it\'s already hidden because of the zoom level', function () {

    });

    it('has a button to show the overlay, even if it can\'t be shown on the current zoom level', function () {

    });
});