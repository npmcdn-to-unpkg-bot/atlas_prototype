describe('The urlReducers factory', function () {
    //var urlReducers;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function () {

        });
    });

    describe('URL_CHANGE', function () {
        it('returns the default state when the payload is empty', function () {

        });

        describe('search', function () {
            it('can set a query', function () {

            });

            it('can set a location', function () {

            });

            it('can be null', function () {

            });
        });

        describe('map', function () {
            it('sets a baseLayer', function () {

            });

            it('can set overlays', function () {
                //Test 0, 1 & 2
            });

            it('sets the center', function () {

            });

            it('sets a zoom level', function () {

            });

            it('can set a highlight', function () {

            });

            it('preserves the showLayerSelection status from the previous state', function () {

            });
        });

        describe('detail', function () {
            it('can set a detail uri', function () {

            });
        });

        describe('straatbeeld', function () {
            it('can set a straatbeeld ID, heading, pitch and fov', function () {

            });
        });

        describe('has no support for loading indicators', function () {
            it('sets map.isLoading to false', function () {

            });

            it('sets detail.isLoading to false if there is a detail page active', function () {

            });

            it('sets straatbeeld.isLoading to false if there is a straatbeeld active', function () {

            });
        });
    });
});